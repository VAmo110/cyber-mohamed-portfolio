
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TerminalLine {
  id: string;
  content: string;
  type: 'command' | 'output' | 'error';
}

const CyberTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', content: 'Cyber Terminal v2.1.0 - Ethical Hacking Simulator', type: 'output' },
    { id: '2', content: 'Type "help" for available commands', type: 'output' },
    { id: '3', content: '='.repeat(50), type: 'output' },
  ]);
  const [currentPath, setCurrentPath] = useState('~/cyber-lab');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  ls          - List directory contents',
      '  cat <file>  - Display file contents',
      '  whoami      - Display current user',
      '  pwd         - Print working directory',
      '  nmap        - Network mapping tool',
      '  john        - Password cracking tool',
      '  sqlmap      - SQL injection tool',
      '  clear       - Clear terminal',
      '  exit        - Close terminal',
    ],
    ls: () => [
      'challenges/',
      'tools/',
      'flags/',
      'scripts/',
      'wordlists/',
      'exploits/',
      'README.txt',
      'flag.txt',
    ],
    pwd: () => [currentPath],
    whoami: () => ['ethical-hacker'],
    clear: () => [],
    'cat flag.txt': () => ['flag{welcome_to_cyber_terminal_simulation}'],
    'cat README.txt': () => [
      'Welcome to the Cyber Terminal!',
      'This is a simulated environment for learning cybersecurity.',
      'Practice ethical hacking techniques safely.',
      'Remember: Always get permission before testing!',
    ],
    nmap: () => [
      'Starting Nmap scan...',
      'Scanning localhost (127.0.0.1)',
      'PORT     STATE SERVICE',
      '22/tcp   open  ssh',
      '80/tcp   open  http',
      '443/tcp  open  https',
      '3306/tcp open  mysql',
      'Scan complete: 4 ports scanned',
    ],
    john: () => [
      'John the Ripper password cracker',
      'Usage: john [options] password-files',
      'Try: john --wordlist=rockyou.txt hashes.txt',
    ],
    sqlmap: () => [
      'SQLMap - Automatic SQL injection tool',
      'Usage: sqlmap -u "target_url" --data="post_data"',
      'Example: sqlmap -u "http://example.com/login.php" --forms',
    ],
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    const commandLine: TerminalLine = {
      id: Date.now().toString(),
      content: `${currentPath}$ ${cmd}`,
      type: 'command'
    };

    if (trimmedCmd === 'clear') {
      setHistory([commandLine]);
      return;
    }

    if (trimmedCmd === 'exit') {
      setIsOpen(false);
      return;
    }

    const output = commands[trimmedCmd as keyof typeof commands] || (() => [`Command not found: ${cmd}. Type "help" for available commands.`]);
    const outputLines = output().map((line, index) => ({
      id: `${Date.now()}-${index}`,
      content: line,
      type: 'output' as const
    }));

    setHistory(prev => [...prev, commandLine, ...outputLines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Terminal Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="border-cyber-purple/40 hover:bg-cyber-purple/20"
      >
        <TerminalIcon size={16} className="mr-2" />
        Cyber Terminal
      </Button>

      {/* Terminal Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`fixed z-50 ${
            isMaximized 
              ? 'inset-4' 
              : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]'
          }`}
        >
          <Card className="h-full bg-black/95 border-cyber-purple/40 shadow-2xl">
            <CardHeader className="p-3 border-b border-cyber-purple/20 bg-cyber-dark/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={16} className="text-cyber-purple2" />
                  <span className="text-sm font-mono">Cyber Terminal</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="w-8 h-8 p-0 hover:bg-cyber-purple/20"
                  >
                    <Maximize2 size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 p-0 hover:bg-red-500/20"
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-[calc(100%-60px)] flex flex-col">
              {/* Terminal Output */}
              <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm"
                style={{ backgroundColor: '#000' }}
              >
                {history.map((line) => (
                  <div
                    key={line.id}
                    className={`mb-1 ${
                      line.type === 'command'
                        ? 'text-cyber-purple2'
                        : line.type === 'error'
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}
                  >
                    {line.content}
                  </div>
                ))}
              </div>

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-cyber-purple/20">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-cyber-purple2">{currentPath}$</span>
                  <input
                    ref={inputRef}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    className="flex-1 bg-transparent text-green-400 outline-none border-none"
                    placeholder="Enter command..."
                    autoComplete="off"
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default CyberTerminal;
