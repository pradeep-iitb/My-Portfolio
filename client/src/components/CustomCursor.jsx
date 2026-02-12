import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const crosshairRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Click animation - spreads lines outward like BGMI
  const playClickAnimation = useCallback(() => {
    const lineTop = lineTopRef.current;
    const lineBottom = lineBottomRef.current;
    const lineLeft = lineLeftRef.current;
    const lineRight = lineRightRef.current;

    if (!lineTop || !lineBottom || !lineLeft || !lineRight) return;

    // Kill any ongoing animations
    gsap.killTweensOf([lineTop, lineBottom, lineLeft, lineRight]);

    // Reset to initial state first
    gsap.set(lineTop, { y: 0, opacity: 1 });
    gsap.set(lineBottom, { y: 0, opacity: 1 });
    gsap.set(lineLeft, { x: 0, opacity: 1 });
    gsap.set(lineRight, { x: 0, opacity: 1 });

    // Animate lines spreading outward
    const tl = gsap.timeline();

    // Spread out
    tl.to(lineTop, { y: -20, opacity: 0.1, duration: 0.6, ease: 'power2.out' }, 0);
    tl.to(lineBottom, { y: 20, opacity: 0.1, duration: 0.6, ease: 'power2.out' }, 0);
    tl.to(lineLeft, { x: -20, opacity: 0.1, duration: 0.6, ease: 'power2.out' }, 0);
    tl.to(lineRight, { x: 20, opacity: 0.1, duration: 0.6, ease: 'power2.out' }, 0);

    // Come back
    tl.to(lineTop, { y: 0, opacity: 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' }, 0.25);
    tl.to(lineBottom, { y: 0, opacity: 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' }, 0.25);
    tl.to(lineLeft, { x: 0, opacity: 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' }, 0.25);
    tl.to(lineRight, { x: 0, opacity: 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' }, 0.25);
  }, []);

  // Mobile touch effect - creates a plus sign effect at touch point
  const createTouchEffect = useCallback((x, y) => {
    const container = document.createElement('div');
    container.className = 'touch-click-effect';
    container.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      width: 24px;
      height: 24px;
    `;

    // Create center dot
    const centerDot = document.createElement('div');
    centerDot.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      width: 3px;
      height: 3px;
      background: #00d4ff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 6px #00d4ff;
    `;
    container.appendChild(centerDot);

    // Create plus sign lines
    const lineStyles = {
      top: 'left: 50%; top: 50%; transform: translateX(-50%); width: 2px; height: 8px;',
      bottom: 'left: 50%; top: 50%; transform: translateX(-50%); width: 2px; height: 8px;',
      left: 'left: 50%; top: 50%; transform: translateY(-50%); width: 8px; height: 2px;',
      right: 'left: 50%; top: 50%; transform: translateY(-50%); width: 8px; height: 2px;',
    };

    const lines = Object.entries(lineStyles).map(([dir, style]) => {
      const line = document.createElement('div');
      line.style.cssText = `
        position: absolute;
        ${style}
        background: linear-gradient(${dir === 'top' || dir === 'bottom' ? '180deg' : '90deg'}, #00d4ff, #8a2be2);
        border-radius: 1px;
        box-shadow: 0 0 6px rgba(0, 212, 255, 0.8);
      `;
      line.dataset.dir = dir;
      return line;
    });

    lines.forEach(line => container.appendChild(line));
    document.body.appendChild(container);

    // Animate
    const tl = gsap.timeline({
      onComplete: () => container.remove()
    });

    // Center dot fades
    tl.to(centerDot, { scale: 2, opacity: 0, duration: 0.3, ease: 'power2.out' }, 0);

    // Lines spread outward
    lines.forEach(line => {
      const dir = line.dataset.dir;
      if (dir === 'top') {
        tl.to(line, { y: -16, opacity: 0, duration: 0.35, ease: 'power2.out' }, 0);
      } else if (dir === 'bottom') {
        tl.to(line, { y: 16, opacity: 0, duration: 0.35, ease: 'power2.out' }, 0);
      } else if (dir === 'left') {
        tl.to(line, { x: -16, opacity: 0, duration: 0.35, ease: 'power2.out' }, 0);
      } else if (dir === 'right') {
        tl.to(line, { x: 16, opacity: 0, duration: 0.35, ease: 'power2.out' }, 0);
      }
    });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const crosshair = crosshairRef.current;

    if (!cursor || !crosshair) return;

    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    
    if (!hasHover) {
      // Hide cursor on mobile but enable touch effects
      cursor.style.display = 'none';
      
      // Touch event for mobile click effect
      const handleTouchStart = (e) => {
        const touch = e.touches[0];
        createTouchEffect(touch.clientX, touch.clientY);
      };

      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
      };
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (crosshair) {
        gsap.to(crosshair, {
          x: mouseX,
          y: mouseY,
          duration: 0.08,
          ease: 'power2.out',
        });
      }
    };

    // Handle hover states
    const handleMouseEnter = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        target.dataset.cursorHover;

      if (isInteractive) {
        setIsHovering(true);
        if (crosshair) {
          gsap.to(crosshair, {
            scale: 1.4,
            duration: 0.2,
            ease: 'power2.out',
          });
        }
        gsap.to('.cursor-line', {
          boxShadow: '0 0 10px #00ffff',
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        target.dataset.cursorHover;

      if (isInteractive) {
        setIsHovering(false);
        if (crosshair) {
          gsap.to(crosshair, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        }
        gsap.to('.cursor-line', {
          boxShadow: '0 0 6px rgba(0, 212, 255, 0.8)',
          duration: 0.2,
        });
      }
    };

    const handleMouseDown = () => {
      playClickAnimation();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      if (cursor) {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
      }
    };

    const handleMouseEnterWindow = () => {
      if (cursor) {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [playClickAnimation, createTouchEffect]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div
        ref={cursorRef}
        className="custom-cursor-container"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2147483647,
        }}
      >
        {/* Crosshair / Plus sign cursor */}
        <div
          ref={crosshairRef}
          className="cursor-crosshair"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '24px',
            height: '24px',
            pointerEvents: 'none',
            zIndex: 2147483647,
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))',
          }}
        >
          {/* Square target brackets */}
          <span style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '4px',
            height: '4px',
            borderLeft: '1.5px solid #00d4ff',
            borderTop: '1.5px solid #00d4ff',
            boxShadow: '-1px -1px 4px rgba(0, 212, 255, 0.8)',
          }} />
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '4px',
            height: '4px',
            borderRight: '1.5px solid #00d4ff',
            borderTop: '1.5px solid #00d4ff',
            boxShadow: '1px -1px 4px rgba(0, 212, 255, 0.8)',
          }} />
          <span style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '4px',
            height: '4px',
            borderLeft: '1.5px solid #00d4ff',
            borderBottom: '1.5px solid #00d4ff',
            boxShadow: '-1px 1px 4px rgba(0, 212, 255, 0.8)',
          }} />
          <span style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '4px',
            height: '4px',
            borderRight: '1.5px solid #00d4ff',
            borderBottom: '1.5px solid #00d4ff',
            boxShadow: '1px 1px 4px rgba(0, 212, 255, 0.8)',
          }} />

          {/* Center dot */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '2px',
              height: '2px',
              backgroundColor: '#00d4ff',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px #00d4ff, 0 0 20px rgba(0, 212, 255, 0.6)',
            }}
          />

          {/* Top line */}
          <div
            ref={lineTopRef}
            className="cursor-line"
            style={{
              position: 'absolute',
              left: '11px',
              bottom: '15px',
              width: '2px',
              height: '6px',
              background: 'linear-gradient(180deg, #8a2be2, #00d4ff)',
              borderRadius: '1px',
              boxShadow: '0 0 8px rgba(0, 212, 255, 1)',
            }}
          />

          {/* Bottom line */}
          <div
            ref={lineBottomRef}
            className="cursor-line"
            style={{
              position: 'absolute',
              left: '11px',
              top: '15px',
              width: '2px',
              height: '6px',
              background: 'linear-gradient(0deg, #8a2be2, #00d4ff)',
              borderRadius: '1px',
              boxShadow: '0 0 8px rgba(0, 212, 255, 1)',
            }}
          />

          {/* Left line */}
          <div
            ref={lineLeftRef}
            className="cursor-line"
            style={{
              position: 'absolute',
              right: '15px',
              top: '11px',
              width: '6px',
              height: '2px',
              background: 'linear-gradient(90deg, #8a2be2, #00d4ff)',
              borderRadius: '1px',
              boxShadow: '0 0 8px rgba(0, 212, 255, 1)',
            }}
          />

          {/* Right line */}
          <div
            ref={lineRightRef}
            className="cursor-line"
            style={{
              position: 'absolute',
              left: '15px',
              top: '11px',
              width: '6px',
              height: '2px',
              background: 'linear-gradient(270deg, #8a2be2, #00d4ff)',
              borderRadius: '1px',
              boxShadow: '0 0 8px rgba(0, 212, 255, 1)',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (hover: hover) {
          body {
            cursor: none !important;
          }
          
          /* Force no cursor on all interactive elements */
          a, button, input, select, textarea, [role="button"], [onclick] {
            cursor: none !important;
          }
        }
        
        @media (hover: none), (pointer: coarse) {
          .custom-cursor-container {
            display: none !important;
          }
        }
      `}</style>
    </>,
    document.body
  );
};

export default CustomCursor;