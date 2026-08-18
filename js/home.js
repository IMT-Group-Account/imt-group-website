/* HOME PAGE - Hero Slider & KPI Counter */

(() => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.slider-btn.prev');
    const next = document.querySelector('.slider-btn.next');
    let idx = 0, timer;
    const total = slides.length;

    function go(n) {
        slides[idx].classList.remove('active');
        dots[idx].classList.remove('active');
        idx = (n + total) % total;
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
    }
    function start() { timer = setInterval(() => go(idx + 1), 6000); }
    function stop() { clearInterval(timer); }

    if (prev) prev.addEventListener('click', () => { go(idx - 1); stop(); start(); });
    if (next) next.addEventListener('click', () => { go(idx + 1); stop(); start(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); stop(); start(); }));

    if (total > 0) start();
})();

/* KPI counter */
(() => {
    const nums = document.querySelectorAll('.kpi-num');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const el = en.target;
                const target = +el.dataset.target;
                const dur = 1600;
                const start = performance.now();
                const isYear = target > 1900;
                function step(t) {
                    const p = Math.min((t - start) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    const v = Math.floor(target * eased);
                    el.textContent = isYear ? v : v.toLocaleString();
                    if (p < 1) requestAnimationFrame(step);
                    else el.textContent = isYear ? target : target.toLocaleString();
                }
                requestAnimationFrame(step);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    nums.forEach(n => obs.observe(n));
})();
