import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const VideoLoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);

  // Get video metadata and set duration
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setVideoDuration(video.duration);
      };
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 30;
        const newProgress = Math.min(prev + increment, 95);
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Wait for video to complete and then transition
  useEffect(() => {
    if (videoDuration <= 0) return;

    const timer = setTimeout(() => {
      setProgress(100);
      gsap.to('.video-loading-screen', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        pointerEvents: 'none',
        onComplete: () => {
          setIsVisible(false);
          onLoadingComplete?.();
        },
      });
    }, (videoDuration * 1000) - 100);

    return () => clearTimeout(timer);
  }, [videoDuration, onLoadingComplete]);

  // Unmute video on first user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="video-loading-screen fixed inset-0 z-50 w-full h-full overflow-hidden"
      style={{
        backgroundColor: '#020625',
      }}
    >
      {/* Video Background - Full and Clear */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: 'center',
          maxHeight: '75vh',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <source src="/aceracer_2.mp4" type="video/mp4" />
      </video>

      {/* Bottom Right Loading Text Container */}
      <div className="absolute bottom-20 sm:bottom-12 right-4 sm:right-8 z-20 backdrop-blur-sm bg-black/20 px-4 sm:px-6 py-3 sm:py-4 rounded-lg max-w-xs sm:max-w-none">
        {/* Loading Text */}
        <div className="space-y-2 sm:space-y-3">
          <div
            className="text-right"
            style={{
              fontFamily: 'var(--font-neuton)',
            }}
          >
            {/* Animated Loading Text */}
            <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-pulse">
              Loading
              <span className="inline-block ml-1">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              </span>
            </div>

            {/* Progress Percentage */}
            <div className="text-xs sm:text-sm text-cyan-300/80 mt-2 font-mono">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Decorative Progress Bar */}
          <div className="w-24 sm:w-32 h-0.5 bg-cyan-900/30 rounded-full overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(138, 43, 226, 0.4)',
                transition: 'width 0.3s ease-out',
              }}
            />
          </div>

          {/* Status Text */}
          <div className="text-xs text-cyan-400/70 mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
            <div>Initializing system...</div>
            <div className="text-purple-400/70">Preparing environment</div>
          </div>
        </div>

        {/* Decorative Corner Brackets */}
        <div className="absolute -bottom-4 -right-4 text-cyan-500/40 text-2xl font-bold">]</div>
        <div className="absolute -top-4 -right-4 text-cyan-500/40 text-2xl font-bold">[</div>
      </div>

      {/* Top Left Corner Info */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-cyan-500 text-xs font-mono z-20 backdrop-blur-sm bg-black/20 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
        <div>SYSTEM: {Math.floor(Math.random() * 9999)}</div>
        <div>STATUS: LOADING</div>
      </div>

      {/* Click for Audio Message - Center Bottom */}
      <div className="absolute bottom-6 sm:bottom-32 left-1/2 transform -translate-x-1/2 text-center z-20 backdrop-blur-sm bg-black/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-cyan-500/30 animate-pulse max-w-xs sm:max-w-none">
        <div className="text-cyan-400 text-xs sm:text-sm font-mono">🔊 Click to unmute</div>
      </div>
    </div>
  );
};

export default VideoLoadingScreen;
