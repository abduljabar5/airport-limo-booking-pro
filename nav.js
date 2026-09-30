/**
 * Total Town Car — shared header behaviour (all pages).
 * Mobile menu (scrolls within itself, body pinned while open, iOS-safe),
 * mobile services accordion, desktop services mega-menu, header scroll state,
 * and active-link highlighting based on the current URL.
 */
(function () {
    // Body pin while the mobile menu is open
    const style = document.createElement('style');
    style.textContent = 'body.menu-open{position:fixed;width:100%;overflow:hidden}';
    document.head.appendChild(style);

    const header = document.getElementById('header');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    let savedY = 0;

    function setMenu(open) {
        if (!menu) return;
        menu.classList.toggle('hidden', !open);
        if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
        if (open) {
            savedY = window.scrollY;
            document.body.style.top = `-${savedY}px`;
            document.body.classList.add('menu-open');
        } else if (document.body.classList.contains('menu-open')) {
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            window.scrollTo(0, savedY);
        }
    }

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenu(menu.classList.contains('hidden'));
        });
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('click', (e) => {
            if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
        });
        window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
    }

    // Mobile services accordion
    const accBtn = document.getElementById('mobile-services-btn');
    const accMenu = document.getElementById('mobile-services-menu');
    accBtn?.addEventListener('click', () => {
        accMenu?.classList.toggle('hidden');
        accBtn.querySelector('svg')?.classList.toggle('rotate-180');
    });

    // Desktop services dropdown (click, closes on outside click / Escape)
    const ddBtn = document.getElementById('services-dropdown-btn');
    const dd = document.getElementById('services-dropdown');
    const closeDd = () => { dd?.classList.remove('show'); ddBtn?.querySelector('svg')?.classList.remove('rotate-180'); ddBtn?.setAttribute('aria-expanded', 'false'); };
    ddBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = !dd.classList.contains('show');
        dd.classList.toggle('show', open);
        ddBtn.querySelector('svg')?.classList.toggle('rotate-180', open);
        ddBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => { if (dd && ddBtn && !ddBtn.contains(e.target) && !dd.contains(e.target)) closeDd(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeDd(); setMenu(false); } });

    // Conversion signals for GTM (map these events to Google Ads conversions in Tag Manager)
    window.dataLayer = window.dataLayer || [];
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="tel:"]');
        if (a) window.dataLayer.push({ event: 'phone_click', phone: a.getAttribute('href').replace('tel:', ''), page: location.pathname });
    });

    // Header scroll state
    if (header) {
        const onScroll = () => header.classList.toggle('header-scrolled', window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Dynamic headline for ad landing pages: ?h1=Airport%20Car%20Service%20Edina
    // Plain text only (tags stripped), 80 chars max; the last two words keep the gold highlight.
    try {
        const h1param = new URLSearchParams(location.search).get('h1');
        const h1 = document.querySelector('main h1, h1');
        if (h1param && h1) {
            const text = h1param.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 80);
            if (text.length >= 4) {
                const words = text.split(' ');
                const tail = words.length > 3 ? words.splice(-2).join(' ') : '';
                h1.textContent = '';
                h1.append(words.join(' ') + (tail ? ' ' : ''));
                if (tail) { const sp = document.createElement('span'); sp.className = 'text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500'; sp.textContent = tail; h1.append(sp); }
                document.title = text + ' | Total Town Car Service';
                window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'dynamic_headline', h1: text });
            }
        }
    } catch (e) { /* ignore */ }

    // Active link
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    let inDropdown = false;
    document.querySelectorAll('#header a[href]').forEach(a => {
        const href = (a.getAttribute('href') || '').split('?')[0].split('#')[0].toLowerCase();
        if (!href || href !== here) return;
        if (a.closest('#services-dropdown')) { a.classList.add('bg-gold-400/10', 'text-white'); a.classList.remove('text-obsidian-300'); inDropdown = true; }
        else if (a.closest('#mobile-services-menu')) { a.classList.add('text-white'); a.classList.remove('text-obsidian-400'); inDropdown = true; }
        else if (a.classList.contains('elegant-link') || a.closest('#mobile-menu')) { a.classList.add('text-white'); a.classList.remove('text-obsidian-300'); a.setAttribute('aria-current', 'page'); }
    });
    if (inDropdown) { ddBtn?.classList.add('text-white'); ddBtn?.classList.remove('text-obsidian-300'); accBtn?.classList.add('text-white'); accBtn?.classList.remove('text-obsidian-300'); }
})();
