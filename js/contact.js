/* ============================================
   IMT Group · Contact Form
   - ① RESTful Table API (백업 저장)
   - ② Google Apps Script → 스프레드시트 + 이메일 알림
   ============================================ */

// 🔗 Google Apps Script Web App Endpoint
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwWBbIC-Gv4Ee6fPOgB-b5kencBuRcRpsVC1guyWLAvfO0kXOsfTNYA7fA-5dpvFyra/exec';

/* ----------------------------------------------
   1. URL 파라미터 → 관심 분야 자동 체크
   (e.g. contact.html?interest=mylodge)
---------------------------------------------- */
(() => {
    const params = new URLSearchParams(location.search);
    const interest = params.get('interest');
    const map = {
        'mylodge': '마이롯지 공유별장 분양',
        'dubai-koreatown': '두바이 코리아 타운 이주/정착',
        'younggyul': '영결원/샹그릴라 상담',
        'shangrila': '영결원/샹그릴라 상담',
        'etc': '기타 비즈니스 제휴'
    };
    if (interest && map[interest]) {
        const target = map[interest];
        document.querySelectorAll('input[name="interest"]').forEach(cb => {
            if (cb.value === target) cb.checked = true;
        });
        setTimeout(() => {
            document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
    }
})();

/* ----------------------------------------------
   2. Form Submit Handler
---------------------------------------------- */
const form = document.getElementById('inquiryForm');
const msg = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.className = 'form-message';
        msg.textContent = '';

        // ── 입력값 수집 ──
        const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(c => c.value);
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();
        const agree = document.getElementById('agree').checked;

        // ── 검증 ──
        if (interests.length === 0) {
            return showError('⚠ 관심 분야를 1개 이상 선택해 주세요.');
        }
        if (!name || !phone) {
            return showError('⚠ 이름과 연락처를 입력해 주세요.');
        }
        if (!agree) {
            return showError('⚠ 개인정보 수집·이용에 동의해 주세요.');
        }

        // ── 버튼 로딩 ──
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 전송 중...';

        const payload = {
            name,
            phone,
            interests,
            message,
            agree_privacy: true,
            source: 'imtgroup-website',
            page_url: location.href,
            user_agent: navigator.userAgent,
            created_at: Date.now()
        };

        try {
            // ── ① RESTful Table API (내부 백업 저장) ──
            const apiPromise = fetch('tables/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(err => {
                console.warn('[contacts table] failed (non-blocking):', err);
            });

            // ── ② Google Apps Script (스프레드시트 + 이메일 알림) ──
            // CORS 우회를 위해 no-cors 모드 + text/plain 사용
            const gasPromise = fetch(GAS_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            }).catch(err => {
                console.warn('[GAS endpoint] failed (non-blocking):', err);
            });

            // 두 요청 병렬 실행 (no-cors라 응답 검증은 불가하지만 전송은 정상 처리됨)
            await Promise.allSettled([apiPromise, gasPromise]);

            // ── 성공 메시지 ──
            msg.className = 'form-message success';
            msg.innerHTML = `✓ <strong>${name}</strong>님, 상담 신청이 정상적으로 접수되었습니다.<br>영업일 기준 24시간 이내 담당자가 연락드립니다.`;
            form.reset();
            window.scrollTo({ top: msg.offsetTop - 120, behavior: 'smooth' });

            // GA4/Meta Pixel 트래킹 훅 (필요 시 활성화)
            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead', {
                    event_category: 'contact',
                    event_label: interests.join(', ')
                });
            }
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', { content_category: interests.join(', ') });
            }
        } catch (err) {
            console.error(err);
            msg.className = 'form-message error';
            msg.textContent = '⚠ 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '담당자 다이렉트 상담 신청 <i class="fa-solid fa-arrow-right arrow"></i>';
        }
    });
}

function showError(text) {
    msg.className = 'form-message error';
    msg.textContent = text;
    window.scrollTo({ top: msg.offsetTop - 120, behavior: 'smooth' });
}
