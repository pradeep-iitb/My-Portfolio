import GooeyNav from './GooeyNav';
import MobileMenu from './MobileMenu';
import CustomCursor from './CustomCursor';
import RotatingText from './RotatingText';
import GridScan from './Gridscan';
import { useRef } from 'react';
import LetterGlitch from './LetterGlitch';
import StarBorder from './StarBorder';
import LogoLoop from './LogoLoop';
import { ParticleCard, GlobalSpotlight } from './MagicBento';
import ElectricBorder from './ElectricBorder';

// Certification data
const certifications = [
  {
    title: 'IBM Cybersecurity Essentials',
    issuer: 'IBM',
    status: 'completed',
    description: 'Comprehensive foundation in cybersecurity principles, threat landscape, and security operations.',
    color: '#00d4ff'
  },
  {
    title: 'ISC2 Certified in Cybersecurity',
    issuer: 'Skillup+',
    status: 'completed',
    description: 'Entry-level certification covering security principles, access controls, and network security fundamentals.',
    color: '#8a2be2'
  },
  {
    title: 'Google Professional Cybersecurity',
    issuer: 'Google',
    status: 'completed',
    description: 'Professional certificate covering security operations, threat detection, and incident response.',
    color: '#00ff88'
  },
  {
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    status: 'upcoming',
    description: 'Industry-standard certification for IT security professionals covering threats, attacks, and vulnerabilities.',
    color: '#ff6b6b'
  },
  {
    title: 'OSCP+',
    issuer: 'Offensive Security',
    status: 'upcoming',
    description: 'Advanced penetration testing certification focusing on hands-on offensive security skills.',
    color: '#ffd93d'
  }
];

// Project data
const projects = [
  {
    title: 'Ethical Hacking Writeups',
    description: 'A comprehensive repository documenting my journey from cybersecurity fundamentals to professional certification. Contains detailed study notes covering Computer Networking concepts, Linux command line mastery, penetration testing methodologies, and complete IBM Cybersecurity Professional Certificate coursework. Includes hands-on labs, vulnerability assessments, and real-world security scenarios.',
    tags: ['Security', 'Documentation', 'Learning'],
    color: '#00d4ff',
    link: 'https://github.com/pradeep-iitb/EthicalHacking'
  },
  {
    title: 'Cyber-Portfolio',
    description: 'My cybersecurity headquarters, reimagined. A highly interactive, optimized React application showcasing my skills, write-ups, and certifications with a modern UI.',
    tags: ['React', 'GSAP', 'UI/UX'],
    color: '#8a2be2',
    link: '#'
  },
  {
    title: 'Protrain AI',
    description: 'An AI-powered simulator that helps loan collection agents practice conversations with borrowers — like a "flight simulator for loan recovery calls."',
    tags: ['AI', 'Full-Stack', 'Training'],
    color: '#00ff88',
    link: 'https://protrain-frontend.vercel.app/'
  },
  {
    title: 'Sanitas AI',
    description: 'A modern healthcare-focused web platform for UI design exploration, featuring health tracking, AI chat with Meru, and video calls with health specialists.',
    tags: ['Healthcare', 'AI', 'API Integration'],
    color: '#ff6b6b',
    link: 'https://sanitas-six.vercel.app/'
  },
  {
    title: 'TryHackMe & CTF Writeups',
    description: 'Collection of CTF challenge solutions and TryHackMe room writeups, documenting techniques and methodologies for penetration testing.',
    tags: ['CTF', 'Pentesting', 'Writeups'],
    color: '#ffd93d',
    link: 'https://github.com/pradeep-iitb/Labs&CTF-Writeups'
  }
];

// Skill logos for LogoLoop - Hacking & Security Tools
const skillLogos = [
  // Security & Pentesting Tools (Using reliable CDN sources)
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', alt: 'Kali Linux', title: 'Kali Linux' },
  { src: 'https://cdn.simpleicons.org/wireshark/1679A7', alt: 'Wireshark', title: 'Wireshark' },
  { src: 'https://cdn.simpleicons.org/metasploit/2596CD', alt: 'Metasploit', title: 'Metasploit' },
  { src: 'https://cdn.simpleicons.org/tryhackme/212C42', alt: 'TryHackMe', title: 'TryHackMe' },
  { src: 'https://cdn.simpleicons.org/hackthebox/9FEF00', alt: 'HackTheBox', title: 'HackTheBox' },
  { src: 'https://cdn.simpleicons.org/owasp/000000', alt: 'OWASP', title: 'OWASP' },
  { src: 'https://cdn.simpleicons.org/kalilinux/557C94', alt: 'Kali Tools', title: 'Kali Tools' },
  { src: 'https://cdn.simpleicons.org/gnubash/4EAA25', alt: 'Bash', title: 'Bash Scripting' },
  { src: 'https://cdn.simpleicons.org/gnome/4A86CF', alt: 'Terminal', title: 'Terminal' },
  { src: 'https://cdn.simpleicons.org/virtualbox/183A61', alt: 'VirtualBox', title: 'VirtualBox' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker', title: 'Docker' },
  { src: 'https://cdn.simpleicons.org/vmware/607078', alt: 'VMware', title: 'VMware' },
  // Programming & Development
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python', title: 'Python' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript', title: 'JavaScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js', title: 'Node.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', title: 'React' },
  { src: 'https://cdn.simpleicons.org/express/000000', alt: 'Express', title: 'Express' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB', title: 'MongoDB' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', alt: 'SQL', title: 'SQL' },
  { src: 'https://cdn.simpleicons.org/github/ffffff', alt: 'GitHub', title: 'GitHub' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git', title: 'Git' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', alt: 'VS Code', title: 'VS Code' },
  { src: 'https://cdn.simpleicons.org/greensock/88CE02', alt: 'GSAP', title: 'GSAP' },
  { src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', alt: 'Tailwind', title: 'Tailwind CSS' },
  { src: 'https://cdn.simpleicons.org/cloudflare/F38020', alt: 'Cloudflare', title: 'Cloudflare' },
  { src: 'https://cdn.simpleicons.org/vercel/ffffff', alt: 'Vercel', title: 'Vercel' },
];
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Intro', href: '#intro' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const roles = [
  'Cybersecurity Expert',
  'Ethical Hacker',
  'Web Developer',
  'Security Analyst',
];

// Glitch Text Component
const GlitchText = ({ children, className = '' }) => {
  return (
    <span className={`glitch-text ${className}`} data-text={children}>
      {children}
    </span>
  );
};

// Scanlines overlay
const Scanlines = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-20"
    style={{
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
    }}
  />
);

const MainContent = () => {
  const certsGridRef = useRef(null);
  const projectsGridRef = useRef(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020625' }}>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation - Desktop */}
      <GooeyNav items={navItems} />
      
      {/* Mobile Menu */}
      <MobileMenu items={navItems} accentColor="#00d4ff" menuButtonColor="#00d4ff" />
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0" 
        style={{ backgroundColor: '#020625' }}
      >
        {/* GridScan Background - Amazing cyberpunk effect */}
        <div className="absolute inset-0 w-full h-full">
        <LetterGlitch
        glitchSpeed={120}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
        />  
        </div>
        {/* Scanlines Overlay */}
        <Scanlines />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020625]/80 via-transparent to-[#020625]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020625]/60 via-transparent to-[#020625]/60 pointer-events-none" />
        
        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1">
              {/* Terminal Prompt */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-blue-400 font-mono">~</span>
                <span className="text-white font-mono">whoami</span>
              </div>
              
              {/* Name with Glitch Effect */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-normal pr-4" style={{ fontFamily: 'var(--font-felipa)', overflow: 'visible' }}>
                  <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                    PRADEEP
                  </GlitchText>
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-normal pr-4" style={{ fontFamily: 'var(--font-felipa)', overflow: 'visible' }}>
                  <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
                    KUMAWAT
                  </GlitchText>
                </h1>
              </div>
              
              {/* Rotating Text Role Box */}
              <div className="inline-block">
                <div 
                  className="relative px-4 sm:px-6 py-2 sm:py-3 rounded-lg overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(0, 255, 255, 0.1) 100%)',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #8a2be2, #00ffff) 1',
                    boxShadow: '0 0 20px rgba(138, 43, 226, 0.3), 0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(138, 43, 226, 0.1)',
                  }}
                >
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-lg animate-pulse" style={{
                    background: 'linear-gradient(135deg, transparent, rgba(138, 43, 226, 0.1), transparent)',
                  }} />
                  
                  <div className="relative flex items-center gap-2">
                    <span className="text-cyan-400 text-xl sm:text-2xl font-mono">&gt;</span>
                    <RotatingText
                      texts={roles}
                      mainClassName="text-lg sm:text-2xl md:text-3xl font-bold text-white"
                      staggerFrom="first"
                      staggerDuration={0.02}
                      rotationInterval={2500}
                      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                      style={{ fontFamily: 'var(--font-imperial)', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <a 
                  href="#certifications"
                  className="group relative w-[140px] sm:w-[180px] h-[45px] sm:h-[50px] font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden flex items-center justify-center text-xs sm:text-sm"
                  style={{
                    backgroundImage: 'url(/Images/Button.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    clipPath: 'polygon(8% 0%, 100% 0%, 100% 0%, 100% 85%, 92% 100%, 0% 100%, 0% 100%, 0% 15%)',
                  }}
                >
                  <span className="relative z-10 text-purple-300 group-hover:text-white transition-colors">
                    Certifications
                  </span>
                </a>
                
                <a 
                  href="#contact"
                  className="group relative w-[140px] sm:w-[180px] h-[45px] sm:h-[50px] font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden flex items-center justify-center text-xs sm:text-sm"
                  style={{
                    backgroundImage: 'url(/Images/Button.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    clipPath: 'polygon(8% 0%, 100% 0%, 100% 0%, 100% 85%, 92% 100%, 0% 100%, 0% 100%, 0% 15%)',
                  }}
                >
                  <span className="relative z-10 text-cyan-300 group-hover:text-white transition-colors">
                    Contact
                  </span>
                </a>
              </div>
            </div>
            
            {/* Right Content - Hacker Image Card */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Glow effects behind the card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse" />
                
                {/* Main card */}
                <div 
                  className="relative rounded-lg"
                  style={{
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #00ffff, #8a2be2, #ff00ff) 1',
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(138, 43, 226, 0.2)',
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src="/Images/Herocomponent.jpg" 
                      alt="Hacker Profile"
                      className="w-[250px] sm:w-[300px] md:w-[380px] lg:w-[450px] h-auto object-cover block"
                    />
                    
                    {/* Animated glowing scanline moving up and down */}
                    <div 
                      className="absolute left-0 right-0 h-[3px] pointer-events-none animate-scanline"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), rgba(255, 255, 255, 0.9), rgba(0, 255, 255, 0.8), transparent)',
                        boxShadow: '0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 45px rgba(0, 255, 255, 0.3)',
                        zIndex: 20,
                      }}
                    />
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-30" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500 z-30" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500 z-30" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section 
        id="intro" 
        className="relative min-h-screen flex items-center py-20" 
        style={{ backgroundColor: '#020625' }}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left - Profile Image with Electric Border */}
            <div className="flex-shrink-0">
              <ElectricBorder
                color="#00d4ff"
                speed={1}
                chaos={0.08}
                borderRadius={16}
              >
                <img 
                  src="/Images/Profile.png" 
                  alt="Pradeep Kumawat"
                  className="w-[280px] md:w-[320px] lg:w-[360px] h-auto object-cover rounded-xl"
                />
              </ElectricBorder>
            </div>
            
            {/* Right - Intro Text */}
            <div className="flex-1 space-y-6">
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
                <span className="text-cyan-400 text-sm tracking-widest" style={{ fontFamily: 'var(--font-medieval)' }}>ABOUT ME</span>
              </div>
              
              {/* Intro Text */}
              <div className="space-y-4 text-gray-300 leading-relaxed" style={{ fontFamily: 'var(--font-neuton)' }}>
                <p className="text-lg">
                  I'm <span className="text-cyan-400 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>Pradeep</span>, a fresher at <span className="text-purple-400 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>IIT Bombay</span> driven by curiosity about how digital systems are built, broken, and secured. My primary interest lies in <span className="text-cyan-400">Cybersecurity</span> and <span className="text-pink-400">Ethical Hacking</span>, where I focus on understanding vulnerabilities, attack surfaces, and real-world security challenges.
                </p>
                <p className="text-lg">
                  Alongside this, I work on full-stack development projects using tools like <span className="text-cyan-300">React</span>, <span className="text-green-400">Node</span>, <span className="text-yellow-400">GSAP</span> and modern web frameworks to gain hands-on insight into how secure and scalable applications are designed.
                </p>
                <p className="text-lg">
                  Beyond academics, I believe in continuous learning, problem-solving, and pushing myself out of my comfort zone — whether it's coding, collaborating with peers, or exploring new opportunities. I aspire to grow into a role where I can blend <span className="text-purple-400">creativity</span>, <span className="text-cyan-400">technical expertise</span>, and <span className="text-pink-400">leadership</span> to make a meaningful impact.
                </p>
                <p className="text-yellow-400" style={{ fontFamily: 'var(--font-imperial)', fontSize: '2rem', lineHeight: '1.8' }}>
                  "Always open to connecting with like-minded people, sharing ideas, and learning from diverse perspectives."
                </p>
              </div>
              
              {/* Download Resume Button */}
              <div className="pt-4">
                <StarBorder
                  as="a"
                  href="/resume.pdf"
                  download
                  color="#00ffff"
                  speed="5s"
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </span>
                </StarBorder>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section 
        id="skills" 
        className="relative min-h-screen flex flex-col items-center justify-center py-20" 
        style={{ backgroundColor: '#020625' }}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-sm tracking-widest" style={{ fontFamily: 'var(--font-medieval)' }}>WHAT I USE</span>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Skills & Tools
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-story)', fontSize: '1.25rem' }}>
            Technologies and tools I use to bring ideas to life and secure digital systems
          </p>
        </div>
        
        {/* Logo Loop - Moving Right */}
        <div className="w-full mb-8">
          <LogoLoop
            logos={skillLogos}
            speed={80}
            direction="left"
            logoHeight={60}
            gap={60}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="#020625"
            className="py-4"
          />
        </div>
        
        {/* Logo Loop - Moving Left */}
        <div className="w-full">
          <LogoLoop
            logos={[...skillLogos].reverse()}
            speed={80}
            direction="right"
            logoHeight={60}
            gap={60}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="#020625"
            className="py-4"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-500/20 rounded-full blur-sm" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-purple-500/20 rounded-full blur-sm" />
      </section>
      
      <section 
        id="certifications" 
        className="relative min-h-screen py-20" 
        style={{ backgroundColor: '#020625' }}
      >
        {/* Global Spotlight Effect */}
        <GlobalSpotlight 
          gridRef={certsGridRef} 
          enabled={true} 
          glowColor="0, 212, 255" 
          spotlightRadius={400}
        />
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-sm tracking-widest" style={{ fontFamily: 'var(--font-medieval)' }}>CREDENTIALS</span>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Certifications
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-story)', fontSize: '1.25rem' }}>
            Professional certifications validating my cybersecurity expertise
          </p>
        </div>
        
        {/* Certification Cards Grid with MagicBento ParticleCards */}
        <div className="container mx-auto px-6 lg:px-12" ref={certsGridRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <ParticleCard
                key={index}
                className="group rounded-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 0, 16, 0.95) 0%, rgba(2, 6, 37, 0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                particleCount={8}
                glowColor={cert.color === '#00d4ff' ? '0, 212, 255' : cert.color === '#8a2be2' ? '138, 43, 226' : cert.color === '#00ff88' ? '0, 255, 136' : cert.color === '#ff6b6b' ? '255, 107, 107' : '255, 217, 61'}
                enableTilt={true}
                clickEffect={true}
                enableMagnetism={true}
              >
                {/* Top accent line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                />
                
                <div className="relative p-6">
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className={`text-xs font-mono px-3 py-1 rounded-full ${
                        cert.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {cert.status === 'completed' ? '✓ Completed' : '◐ Upcoming'}
                    </span>
                    <span className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>{cert.issuer}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: cert.color, fontFamily: 'var(--font-heading)' }}
                  >
                    {cert.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    {cert.description}
                  </p>
                </div>
                
                {/* Corner decorations */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10" style={{
                  background: `linear-gradient(135deg, transparent 50%, ${cert.color} 50%)`
                }} />
              </ParticleCard>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-24 h-24 border border-cyan-500/10 rounded-full" />
        <div className="absolute bottom-40 right-10 w-32 h-32 border border-purple-500/10 rounded-full" />
      </section>
      
      <section 
        id="projects" 
        className="relative min-h-screen py-20" 
        style={{ backgroundColor: '#020625' }}
      >
        {/* Global Spotlight Effect */}
        <GlobalSpotlight 
          gridRef={projectsGridRef} 
          enabled={true} 
          glowColor="138, 43, 226" 
          spotlightRadius={450}
        />
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 text-sm tracking-widest" style={{ fontFamily: 'var(--font-medieval)' }}>PORTFOLIO</span>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-story)', fontSize: '1.25rem' }}>
            Showcasing my work in cybersecurity, development, and AI
          </p>
        </div>
        
        {/* Project Cards Grid - Bento Style with ParticleCard */}
        <div className="container mx-auto px-6 lg:px-12" ref={projectsGridRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ParticleCard 
                key={index}
                className={`group rounded-xl transition-all duration-300 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 0, 16, 0.95) 0%, rgba(2, 6, 37, 0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                particleCount={10}
                glowColor={project.color === '#00d4ff' ? '0, 212, 255' : project.color === '#8a2be2' ? '138, 43, 226' : project.color === '#00ff88' ? '0, 255, 136' : project.color === '#ff6b6b' ? '255, 107, 107' : '255, 217, 61'}
                enableTilt={true}
                clickEffect={true}
                enableMagnetism={true}
              >
                {/* Top accent line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />
                
                <div className="relative p-6 h-full flex flex-col">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-white"
                    style={{ color: project.color, fontFamily: 'var(--font-heading)' }}
                  >
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow" style={{ fontFamily: 'var(--font-body)' }}>
                    {project.description}
                  </p>
                  
                  {/* View Project Link */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-mono transition-colors duration-300 hover:text-white"
                      style={{ color: project.color }}
                    >
                      View Project
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10" style={{
                  background: `linear-gradient(135deg, transparent 50%, ${project.color} 50%)`
                }} />
                
                {/* Particle dots decoration */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-40" style={{ background: project.color }} />
                <div className="absolute top-8 right-8 w-1 h-1 rounded-full opacity-30" style={{ background: project.color }} />
              </ParticleCard>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-20 w-40 h-40 border border-purple-500/10 rounded-full blur-sm" />
        <div className="absolute bottom-1/4 left-20 w-28 h-28 border border-pink-500/10 rounded-full blur-sm" />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen flex items-center py-20" style={{ backgroundColor: '#020625' }}>
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
        
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-cyan-400 text-sm tracking-widest" style={{ fontFamily: 'var(--font-medieval)' }}>GET IN TOUCH</span>
              <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Let's Connect
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-story)', fontSize: '1.25rem' }}>
              Open to collaborations, discussions about cybersecurity, or just a friendly chat about tech!
            </p>
          </div>
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            
            {/* Email */}
            <a 
              href="mailto:pradeepkumawat132005@gmail.com"
              className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 0, 16, 0.9) 0%, rgba(2, 6, 37, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 70%)'
              }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Email</h3>
                <p className="text-gray-400 break-all" style={{ fontFamily: 'var(--font-neuton)', fontSize: '1rem' }}>pradeepkumawat132005@gmail.com</p>
              </div>
            </a>
            
            {/* GitHub */}
            <a 
              href="https://github.com/pradeep-iitb"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 0, 16, 0.9) 0%, rgba(2, 6, 37, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.15) 0%, transparent 70%)'
              }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>GitHub</h3>
                <p className="text-gray-400" style={{ fontFamily: 'var(--font-neuton)', fontSize: '1rem' }}>@pradeep-iitb</p>
              </div>
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/pradeep-kumawat-cyber"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 0, 16, 0.9) 0%, rgba(2, 6, 37, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 119, 181, 0.2) 0%, transparent 70%)'
              }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>LinkedIn</h3>
                <p className="text-gray-400" style={{ fontFamily: 'var(--font-neuton)', fontSize: '1rem' }}>pradeep-kumawat-cyber</p>
              </div>
            </a>
            
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/pradeep_kmt.deb/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 0, 16, 0.9) 0%, rgba(2, 6, 37, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(225, 48, 108, 0.15) 0%, transparent 70%)'
              }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                  <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Instagram</h3>
                <p className="text-gray-400" style={{ fontFamily: 'var(--font-neuton)', fontSize: '1rem' }}>@pradeep_kmt.deb</p>
              </div>
            </a>
          </div>
          
          {/* Terminal style message */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-cyan-500/20 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border-b border-cyan-500/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-gray-500 text-xs font-mono">contact.sh</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <p className="text-green-400">$ echo "Ready to collaborate?"</p>
                <p className="text-gray-300 mt-2"> &gt; Always open to new opportunities and interesting projects.</p>
                <p className="text-gray-300"> &gt; Let's build something amazing together!</p>
                <p className="text-cyan-400 mt-2 flex items-center gap-2">
                  $ <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-gray-500" style={{ fontFamily: 'var(--font-neuton)', fontSize: '1.1rem' }}>
              Designed & Built by <span className="text-cyan-400" style={{ fontFamily: 'var(--font-felipa)', fontSize: '1.4rem' }}>Pradeep Kumawat</span>
            </p>
            <p className="text-gray-600 mt-2" style={{ fontFamily: 'var(--font-imperial)', fontSize: '1.1rem' }}>© 2026 All Rights Reserved</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-10 w-24 h-24 border border-cyan-500/10 rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-32 h-32 border border-purple-500/10 rounded-full" />
      </section>
    </div>
  );
};

export default MainContent;
