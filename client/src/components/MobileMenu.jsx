import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MobileMenu = ({
  items = [],
  accentColor = '#00d4ff',
  menuButtonColor = '#00d4ff',
  onItemClick
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const overlay = overlayRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;

      if (!panel || !plusH || !plusV || !icon || !overlay) return;

      gsap.set(panel, { xPercent: 100 });
      gsap.set(overlay, { opacity: 0, display: 'none' });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
    });
    return () => ctx.revert();
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.mobile-menu-item'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 100, opacity: 0 });
    gsap.set(overlay, { display: 'block' });

    const tl = gsap.timeline({ paused: true });

    tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
    tl.to(panel, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, 0);

    if (itemEls.length) {
      tl.to(
        itemEls,
        { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power4.out', stagger: { each: 0.08, from: 'start' } },
        0.2
      );
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    closeTweenRef.current?.kill();

    const closeTl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { display: 'none' });
        const itemEls = Array.from(panel.querySelectorAll('.mobile-menu-item'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 100, opacity: 0 });
        busyRef.current = false;
      }
    });

    closeTl.to(panel, { xPercent: 100, duration: 0.35, ease: 'power3.in' }, 0);
    closeTl.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0.1);

    closeTweenRef.current = closeTl;
  }, []);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    if (opening) {
      gsap.to(h, { rotate: 45, duration: 0.4, ease: 'power4.out' });
      gsap.to(v, { rotate: -45, duration: 0.4, ease: 'power4.out' });
    } else {
      gsap.to(h, { rotate: 0, duration: 0.35, ease: 'power3.inOut' });
      gsap.to(v, { rotate: 90, duration: 0.35, ease: 'power3.inOut' });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      document.body.style.overflow = 'hidden';
      playOpen();
    } else {
      document.body.style.overflow = '';
      playClose();
    }

    animateIcon(target);
  }, [playOpen, playClose, animateIcon]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      document.body.style.overflow = '';
      playClose();
      animateIcon(false);
    }
  }, [playClose, animateIcon]);

  const handleItemClick = useCallback((e, item, index) => {
    closeMenu();
    if (onItemClick) {
      onItemClick(item, index);
    }
    // Smooth scroll
    if (item.href?.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(item.href);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }
    }
  }, [closeMenu, onItemClick]);

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        ref={toggleBtnRef}
        className="mobile-menu-btn fixed top-6 right-6 z-[60] flex items-center gap-2 bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-full px-4 py-3 cursor-pointer transition-all duration-300 hover:border-cyan-500/60 hover:bg-black/80"
        style={{ color: menuButtonColor }}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={toggleMenu}
        type="button"
      >
        <span className="text-sm font-semibold uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          {open ? 'Close' : 'Menu'}
        </span>
        <span
          ref={iconRef}
          className="relative w-4 h-4 flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            ref={plusHRef}
            className="absolute w-full h-[2px] rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span
            ref={plusVRef}
            className="absolute w-full h-[2px] rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </span>
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] bg-black/80 backdrop-blur-sm"
        onClick={closeMenu}
        style={{ display: 'none' }}
      />

      {/* Menu Panel */}
      <aside
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-[80%] max-w-[380px] z-[58] flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(2, 6, 37, 0.98) 0%, rgba(10, 22, 40, 0.98) 100%)',
          borderLeft: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 212, 255, 0.1)',
        }}
      >
        {/* Scanlines overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
          }}
        />

        {/* Terminal Header */}
        <div className="pt-24 px-6 pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-cyan-400" style={{ fontFamily: 'var(--font-heading)' }}>root</span>
            <span className="text-white/40">@</span>
            <span className="text-purple-400" style={{ fontFamily: 'var(--font-heading)' }}>navigation</span>
            <span className="text-white/40">:</span>
            <span className="text-cyan-300/70">~$</span>
            <span className="text-white/60 font-mono text-xs">./menu.sh</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-8 px-6">
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={item.label + idx} className="overflow-hidden">
                <a
                  href={item.href}
                  className="mobile-menu-item group relative flex items-center gap-4 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-cyan-500/10"
                  onClick={(e) => handleItemClick(e, item, idx)}
                >
                  {/* Index number */}
                  <span 
                    className="text-xs font-mono opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ color: accentColor, fontFamily: 'var(--font-heading)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Menu item label */}
                  <span 
                    className="text-2xl font-bold uppercase tracking-wide text-white/90 group-hover:text-cyan-400 transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.label}
                  </span>

                  {/* Arrow indicator */}
                  <svg 
                    className="w-5 h-5 ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    style={{ color: accentColor }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>

                  {/* Hover line */}
                  <span 
                    className="absolute bottom-0 left-4 right-4 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: accentColor }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-xs text-white/40">
            <span style={{ fontFamily: 'var(--font-felipa)' }}>Pradeep Kumawat</span>
            <span style={{ fontFamily: 'var(--font-neuton)' }}>© 2025</span>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-20 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30" />
        <div className="absolute bottom-20 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500/30" />
      </aside>

      <style>{`
        .mobile-menu-btn {
          display: none;
        }
        
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default MobileMenu;
