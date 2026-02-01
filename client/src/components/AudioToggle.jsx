import { useRef } from 'react';
import { gsap } from 'gsap';

const AudioToggle = () => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    // Animate button on click
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 group"
      title="Click to enable audio"
      aria-label="Enable audio"
    >
      <div
        className="relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(0, 255, 255, 0.1) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #8a2be2, #00ffff) 1',
          boxShadow: '0 0 10px rgba(138, 43, 226, 0.3), inset 0 0 10px rgba(138, 43, 226, 0.1)',
        }}
      >
        {/* Music note icon */}
        <div className="relative z-10 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v9.28c-.47-.46-1.12-.72-1.84-.72-2.49 0-4.5 2.01-4.5 4.5S7.67 21 10.16 21c1.66 0 3.08-1.01 3.69-2.47h.15V21h2.02V9.5M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 5.23 11.08 5 12 5c3.04 0 5.5 2.46 5.5 5.5v.07H19.35z" />
          </svg>
        </div>

        {/* Subtle pulsing glow */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Tooltip */}
      <div
        className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-cyan-400 text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          border: '1px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
        }}
      >
        Click to enable audio
      </div>
    </button>
  );
};

export default AudioToggle;
