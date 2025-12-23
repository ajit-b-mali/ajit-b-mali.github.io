import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Video, 
  MoreVertical, 
  ArrowLeft, 
  Paperclip, 
  Smile, 
  Mic, 
  Send, 
  Check, 
  CheckCheck,
  Briefcase,
  Code,
  GraduationCap,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Clock,
  Menu,
  X
} from 'lucide-react';

const Portfolio = () => {
  // --- Data from your text file ---
  const personalInfo = {
    name: "Ajit Bajarang Mali",
    status: "Online",
    phone: "9156807784",
    email: "ajitbm2003@gmail.com",
    location: "Pimpri-Chinchwad, Maharashtra",
    links: {
      linkedin: "https://www.linkedin.com/in/ajit-mali-217688308",
      github: "https://github.com/ajit-b-mali",
      leetcode: "https://leetcode.com/u/ajit-mali/",
      codechef: "https://www.codechef.com/users/codecraftman"
    },
    about: "To leverage my knowledge of technology and passion for creativity to effectively express ideas and build innovative solutions. Seeking an opportunity to enhance my skills, contribute to impactful projects, and grow as a professional."
  };

  const skills = {
    programming: ["C++", "JavaScript", "Python"],
    web: ["HTML5", "CSS3", "React", "Node.js", "Express", "MongoDB"],
    tools: ["Git", "Visual Studio", "Regex"],
    database: ["SQL", "MySQL", "MongoDB", "Firebase"],
    cs: ["OOPS", "DSA", "APIs", "System Design"]
  };

  const projects = [
    {
      title: "Visualiser",
      subtitle: "Interactive Geometry",
      desc: "Web-based tool for 2D geometry visualization with interactive shape drawing using HTML5 Canvas API.",
      link: "https://github.com/ajit-b-mali/2D-plane-visualiser",
      tech: "HTML5 Canvas, Chart.js, Firebase"
    },
    {
      title: "GameHUB",
      subtitle: "Game Dev Platform",
      desc: "Online game hub with classics like Snake, Ping Pong, Sudoku, created from scratch using JS Canvas.",
      link: "https://github.com/ajit-b-mali/GameHUB",
      tech: "JS, Canvas API, HTML/CSS"
    }
  ];

  const education = [
    { degree: "MCA", year: "2026", school: "PES Modern College, Pune", score: "8.30 CGPA" },
    { degree: "BCA", year: "2024", school: "DKASC College, Ichalkaranji", score: "8.45 CGPA" }
  ];

  // --- State & Logic ---
  // Fix: Use a ref counter for IDs to satisfy React Compiler purity rules
  const msgIdCounter = useRef(10); 
  const generateId = () => {
    msgIdCounter.current += 1;
    return msgIdCounter.current;
  };

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'received', 
      text: `Hi there! 👋 I'm ${personalInfo.name}.`, 
      timestamp: '10:00 AM' 
    },
    { 
      id: 2, 
      type: 'received', 
      text: personalInfo.about, 
      timestamp: '10:00 AM' 
    },
    { 
      id: 3, 
      type: 'received', 
      text: "Tap a button below to explore my profile! 👇", 
      timestamp: '10:01 AM' 
    }
  ]);
  
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionStep, setTransactionStep] = useState('input'); // input, processing, success
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper to format time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Interaction Handlers
  const handleUserSelection = (option) => {
    // 1. Add User's "Tap" as a message
    const newId = generateId(); // Use helper function instead of Date.now()
    
    const userMsg = {
      id: newId,
      type: 'sent',
      text: option,
      timestamp: getCurrentTime(),
      status: 'read'
    };
    setMessages(prev => [...prev, userMsg]);

    // 2. Simulate Typing Delay then Reply
    setTimeout(() => {
      let replyContent = [];
      
      switch(option) {
        case 'Skills 🛠️':
          replyContent = [
            { type: 'received', text: "Here is my technical arsenal:", timestamp: getCurrentTime() },
            { type: 'skills', data: skills, timestamp: getCurrentTime() }
          ];
          break;
        case 'Projects 💻':
          replyContent = [
            { type: 'received', text: "Check out what I've built:", timestamp: getCurrentTime() },
            ...projects.map(p => ({ type: 'project_card', data: p, timestamp: getCurrentTime() }))
          ];
          break;
        case 'Education 🎓':
          replyContent = [
            { type: 'education', data: education, timestamp: getCurrentTime() }
          ];
          break;
        case 'Hire / Pay 💸':
          setShowTransactionModal(true);
          return; // Don't add a message yet
        default:
          replyContent = [{ type: 'received', text: "I didn't catch that. Try the buttons below!", timestamp: getCurrentTime() }];
      }

      // Add bot replies one by one for realism
      replyContent.forEach((msg, index) => {
        setTimeout(() => {
          setMessages(prev => [...prev, { ...msg, id: generateId() }]); // Use helper here too
        }, 600 * (index + 1));
      });

    }, 500);
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    setTransactionStep('processing');
    setTimeout(() => {
      setTransactionStep('success');
      // Add a success message to chat
      setTimeout(() => {
        setShowTransactionModal(false);
        setMessages(prev => [...prev, { 
          id: generateId(), 
          type: 'transaction_success', 
          amount: "Offer Sent", 
          note: "Collaboration Request",
          timestamp: getCurrentTime() 
        }]);
        setTransactionStep('input');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#d1d7db] font-sans">
      {/* Main Container - Mobile Width on Desktop */}
      <div className="w-full md:w-[450px] bg-[#efeae2] h-screen shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* --- Header --- */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <ArrowLeft className="md:hidden" size={24} />
            {/* Profile Pic Placeholder */}
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#008069] font-bold text-lg border border-white/20">
              {personalInfo.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <h1 className="font-medium text-base leading-tight">{personalInfo.name}</h1>
              <span className="text-xs text-white/80">{personalInfo.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Video size={22} />
            <Phone size={20} />
            <MoreVertical size={20} className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
          </div>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-14 right-2 bg-white text-slate-800 py-2 rounded-lg shadow-xl w-48 z-50 animate-in fade-in slide-in-from-top-2">
              <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"><Github size={16}/> GitHub</a>
              <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"><Linkedin size={16}/> LinkedIn</a>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer" onClick={() => setMenuOpen(false)}>Clear Chat</div>
            </div>
          )}
        </div>

        {/* --- Chat Area --- */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-repeat"
          style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', opacity: 0.95 }}
        >
          {/* Date Divider */}
          <div className="flex justify-center mb-4">
            <span className="bg-[#eef4f6] text-[#54656f] text-xs px-3 py-1.5 rounded-lg shadow-sm">
              Today
            </span>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              
              {/* Message Bubble Logic */}
              <div className={`
                max-w-[85%] relative rounded-lg px-2 py-1 shadow-sm text-sm
                ${msg.type === 'sent' ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'}
              `}>
                
                {/* 1. Text Message */}
                {msg.text && !msg.type.includes('card') && !msg.type.includes('skill') && (
                  <div className="px-2 py-1">
                    <p className="text-[#111b21] leading-relaxed pb-2">{msg.text}</p>
                  </div>
                )}

                {/* 2. Skills Message */}
                {msg.type === 'skills' && (
                  <div className="p-2 min-w-[240px]">
                    <div className="font-bold text-[#008069] mb-2 text-xs uppercase tracking-wide">Technical Skills</div>
                    <div className="space-y-3">
                      {Object.entries(msg.data).map(([category, items]) => (
                        <div key={category}>
                          <span className="text-[10px] text-gray-500 uppercase font-bold">{category}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {items.map(item => (
                              <span key={item} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Project Card Message */}
                {msg.type === 'project_card' && (
                  <div className="w-[280px]">
                    {/* Fake Image Area */}
                    <div className="h-32 bg-slate-200 rounded-t flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500 font-bold text-4xl opacity-50">
                        {msg.data.title.charAt(0)}
                      </div>
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2">
                        <span className="text-white font-bold">{msg.data.title}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-600 mb-2 line-clamp-3">{msg.data.desc}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {msg.data.tech.split(',').map((t, i) => (
                           <span key={i} className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100">{t.trim()}</span>
                        ))}
                      </div>
                      <a 
                        href={msg.data.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#e7ffdb] hover:bg-[#d4f5c3] text-[#008069] py-2 rounded border border-[#008069]/20 font-medium text-xs transition-colors"
                      >
                        <ExternalLink size={14} /> View Project
                      </a>
                    </div>
                  </div>
                )}

                {/* 4. Education Message */}
                {msg.type === 'education' && (
                  <div className="p-2 min-w-[250px]">
                    <div className="font-bold text-[#008069] mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
                      <GraduationCap size={14}/> Education History
                    </div>
                    <div className="space-y-3 divide-y divide-gray-100">
                      {msg.data.map((edu, i) => (
                        <div key={i} className="pt-2 first:pt-0">
                          <div className="font-bold text-gray-800">{edu.degree}</div>
                          <div className="text-xs text-gray-600">{edu.school}</div>
                          <div className="flex justify-between mt-1 text-[10px] text-gray-500 font-medium">
                            <span>{edu.year}</span>
                            <span className="bg-green-100 text-green-800 px-1 rounded">{edu.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Transaction Success Message */}
                {msg.type === 'transaction_success' && (
                  <div className="p-1 min-w-[220px]">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="w-10 h-10 bg-[#008069] rounded-full flex items-center justify-center text-white">
                        <Check size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">₹ {msg.amount}</div>
                        <div className="text-[10px] text-gray-500">{msg.note}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                      <CheckCheck size={12} className="text-blue-400" /> Completed
                    </div>
                  </div>
                )}

                {/* Timestamp & Status */}
                <div className="flex justify-end items-center gap-1 mt-1 pr-1 pb-1">
                  <span className="text-[10px] text-gray-400 tabular-nums">{msg.timestamp}</span>
                  {msg.type === 'sent' && (
                    <CheckCheck size={14} className="text-[#53bdeb]" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* --- Quick Action Chips (Sticky Bottom) --- */}
        <div className="bg-[#efeae2] p-2 flex gap-2 overflow-x-auto no-scrollbar pb-2">
           {['Skills 🛠️', 'Projects 💻', 'Education 🎓', 'Hire / Pay 💸'].map(action => (
             <button
                key={action}
                onClick={() => handleUserSelection(action)}
                className="whitespace-nowrap bg-white text-[#008069] px-4 py-2 rounded-full border border-[#008069]/20 shadow-sm text-sm font-medium active:scale-95 transition-transform"
             >
               {action}
             </button>
           ))}
        </div>

        {/* --- Input Area --- */}
        <div className="bg-[#f0f2f5] px-4 py-2 flex items-center gap-3 shrink-0">
          <div className="text-[#54656f] cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-colors">
             <Smile size={24} />
          </div>
          <div className="text-[#54656f] cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-colors">
             <Paperclip size={24} />
          </div>
          
          <div className="flex-1 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 shadow-sm flex items-center justify-between cursor-not-allowed">
            <span>Type a message...</span>
          </div>

          <div className="bg-[#008069] text-white p-3 rounded-full cursor-pointer hover:bg-[#006e5a] shadow-md transition-colors">
             <Mic size={20} />
          </div>
        </div>

        {/* --- Transaction Modal (WhatsApp Pay Style) --- */}
        {showTransactionModal && (
          <div className="absolute inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center">
            <div className="bg-white w-full md:w-[90%] md:rounded-xl rounded-t-xl animate-in slide-in-from-bottom duration-300 overflow-hidden flex flex-col max-h-[90%]">
              
              {/* Modal Header */}
              <div className="bg-[#008069] text-white p-4 flex items-center gap-4">
                <ArrowLeft className="cursor-pointer" onClick={() => setShowTransactionModal(false)} />
                <h2 className="font-medium text-lg">Send Payment / Offer</h2>
              </div>

              {transactionStep === 'success' ? (
                 <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-[#008069] rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                      <Check size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#008069]">Sent Successfully!</h3>
                    <p className="text-gray-500 text-sm">Your offer has been delivered to Ajit.</p>
                 </div>
              ) : (
                <div className="p-6 flex flex-col gap-6">
                  {/* Amount Input */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-500 text-sm">Enter amount or offer type</span>
                    <div className="flex items-center text-[#111b21] relative">
                      <span className="text-3xl absolute left-0 top-1/2 -translate-y-1/2">₹</span>
                      <input 
                        type="text" 
                        placeholder="0" 
                        className="text-5xl font-medium w-full text-center focus:outline-none placeholder:text-gray-300"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Note Input */}
                  <div className="bg-gray-100 rounded-lg p-3 flex items-start gap-3">
                    <Briefcase className="text-gray-400 mt-1" size={20} />
                    <textarea 
                      placeholder="Add a note (e.g., Hiring for Full Stack Role...)" 
                      className="bg-transparent w-full text-sm focus:outline-none resize-none h-20 text-gray-700"
                    ></textarea>
                  </div>

                  {/* Pay Button */}
                  <button 
                    onClick={handleTransactionSubmit}
                    disabled={transactionStep === 'processing'}
                    className="w-full bg-[#008069] hover:bg-[#017561] text-white py-3 rounded-full font-bold shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                     {transactionStep === 'processing' ? 'Processing...' : 'Next'}
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <div className="w-3 h-3 bg-gray-200 rounded-full" /> 
                    Secured by UPI
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Portfolio;