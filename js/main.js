/* IMT GROUP - GLOBAL JS */

// GNB scroll effect
const gnb = document.querySelector('.gnb');
window.addEventListener('scroll', () => {
    if (gnb) gnb.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        toggle.innerHTML = navMenu.classList.contains('open')
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });
    // mobile dropdown
    document.querySelectorAll('.nav-item').forEach(it => {
        const link = it.querySelector('.nav-link');
        if (link && it.querySelector('.nav-dropdown')) {
            link.addEventListener('click', e => {
                if (window.innerWidth <= 960) {
                    e.preventDefault();
                    it.classList.toggle('active');
                }
            });
        }
    });
}

// Fade-up reveal
const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// Inject GNB & Footer if placeholders exist
const headerHTML = `
<header class="gnb" id="gnb">
  <div class="container gnb-inner">
    <a href="index.html" class="logo" aria-label="IMT Group Home">
      <img src="images/imt-logo.png" alt="IMT Group - Infinity Management Technology" class="logo-img">
    </a>
    <nav>
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="company.html" class="nav-link">Company <i class="fa-solid fa-chevron-down" style="font-size:10px;margin-left:4px"></i></a>
          <div class="nav-dropdown">
            <a href="company.html#overview">회사 개요</a>
            <a href="company.html#core">핵심 비즈니스 영역</a>
            <a href="company.html#history">연혁</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Business <i class="fa-solid fa-chevron-down" style="font-size:10px;margin-left:4px"></i></a>
          <div class="nav-dropdown">
            <a href="business-mylodge.html">마이롯지</a>
            <a href="business-younggyul.html">영결원</a>
            <a href="business-shangrila.html">샹그릴라</a>
            <a href="business-dubai.html">두바이 코리아 타운</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="contact.html" class="nav-link">Contact <i class="fa-solid fa-chevron-down" style="font-size:10px;margin-left:4px"></i></a>
          <div class="nav-dropdown">
            <a href="contact.html#map">오시는 길</a>
            <a href="contact.html#form">제휴 및 상담 문의</a>
          </div>
        </li>
      </ul>
    </nav>
    <a href="contact.html" class="gnb-cta">상담 신청 <i class="fa-solid fa-arrow-right" style="font-size:11px"></i></a>
    <button class="menu-toggle" aria-label="menu"><i class="fa-solid fa-bars"></i></button>
  </div>
</header>`;

const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo" aria-label="IMT Group Home">
          <img src="images/imt-logo.png" alt="IMT Group" class="logo-img footer-logo-img">
        </a>
        <p>(주)아이엠티그룹은 부동산 개발, 글로벌 헬스케어, 프리미엄 라이프 서비스를 아우르는 하이엔드 종합 그룹입니다. 소유의 한계를 넘어 영구적인 가치를 창조합니다.</p>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="company.html#overview">회사 개요</a></li>
          <li><a href="company.html#core">핵심 사업</a></li>
          <li><a href="company.html#history">연혁</a></li>
        </ul>
      </div>
      <div>
        <h4>Business</h4>
        <ul>
          <li><a href="business-mylodge.html">마이롯지</a></li>
          <li><a href="business-younggyul.html">영결원</a></li>
          <li><a href="business-shangrila.html">샹그릴라</a></li>
          <li><a href="business-dubai.html">두바이 코리아 타운</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>서울시 강남구 가로수길 18</li>
          <li>imtgroupglobal@gmail.com</li>
          <li><a href="contact.html">상담 문의 →</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 IMT Group Co., Ltd. All Rights Reserved.</span>

    </div>
  </div>
</footer>`;

const headerSlot = document.getElementById('header-slot');
const footerSlot = document.getElementById('footer-slot');
if (headerSlot) headerSlot.outerHTML = headerHTML;
if (footerSlot) footerSlot.outerHTML = footerHTML;

// Re-bind after injection
window.addEventListener('DOMContentLoaded', () => {
    const gnb2 = document.querySelector('.gnb');
    window.addEventListener('scroll', () => {
        if (gnb2) gnb2.classList.toggle('scrolled', window.scrollY > 40);
    });
    const toggle2 = document.querySelector('.menu-toggle');
    const navMenu2 = document.querySelector('.nav-menu');

    function closeMenu() {
        if (!navMenu2) return;
        navMenu2.classList.remove('open');
        document.body.classList.remove('menu-open');
        if (toggle2) toggle2.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.querySelectorAll('.nav-item.active').forEach(i => i.classList.remove('active'));
    }
    function openMenu() {
        if (!navMenu2) return;
        navMenu2.classList.add('open');
        document.body.classList.add('menu-open');
        if (toggle2) toggle2.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    if (toggle2 && navMenu2) {
        toggle2.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu2.classList.contains('open') ? closeMenu() : openMenu();
        });

        // 모바일에서는 모든 드롭다운이 항상 펼쳐진 상태이므로
        // 데스크탑에서만 active 토글이 작동하도록 처리
        document.querySelectorAll('.nav-item').forEach(it => {
            const link = it.querySelector('.nav-link');
            const dropdown = it.querySelector('.nav-dropdown');
            if (link && dropdown) {
                link.addEventListener('click', e => {
                    if (window.innerWidth <= 960) {
                        // 메인 카테고리 링크 클릭 시 즉시 페이지 이동 후 메뉴 닫기
                        // (드롭다운 토글 없이 항상 펼쳐진 상태 유지)
                        closeMenu();
                    }
                });
            }
        });

        // 드롭다운 내부 링크 클릭 시 메뉴 자동 닫기
        document.querySelectorAll('.nav-dropdown a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth <= 960) closeMenu();
            });
        });

        // ESC 키로 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu2.classList.contains('open')) closeMenu();
        });

        // 화면 리사이즈 시 데스크탑이면 자동 닫기
        window.addEventListener('resize', () => {
            if (window.innerWidth > 960 && navMenu2.classList.contains('open')) closeMenu();
        });
    }
});
