
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const searchCategories = [
    { title: 'Red Team', items: ['Penetration Testing', 'Vulnerability Assessment', 'Kali Linux', 'Exploitation'] },
    { title: 'Blue Team', items: ['SIEM', 'SOC Operations', 'Incident Response', 'Threat Hunting'] },
    { title: 'Purple Team', items: ['Security Assessments', 'MITRE ATT&CK', 'TTP Validation', 'Defensive Strategies'] },
    { title: 'Courses', items: ['RHCSA', 'Ansible', 'Penetration Testing', 'Cloud Security'] },
  ];

  return (
    <div className={`w-full max-w-md relative ${className}`}>
      <Command className="rounded-lg border border-cyber-purple/20 bg-secondary/70 backdrop-blur-sm overflow-visible">
        <div className="flex items-center border-b border-cyber-purple/20 px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 text-cyber-purple2" />
          <CommandInput 
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-cyber-light/50 disabled:cursor-not-allowed disabled:opacity-50 text-cyber-light"
            placeholder="Search cybersecurity topics..." 
            value={query}
            onValueChange={setQuery}
            autoFocus
          />
        </div>
        {query.length > 0 && (
          <CommandList className="max-h-[300px] overflow-y-auto py-2">
            <CommandEmpty className="py-6 text-center text-sm text-cyber-light/70">
              No results found.
            </CommandEmpty>
            {searchCategories.map((category) => (
              <CommandGroup key={category.title} heading={category.title} className="text-cyber-purple2">
                {category.items
                  .filter(item => item.toLowerCase().includes(query.toLowerCase()))
                  .map((item) => (
                    <CommandItem 
                      key={item}
                      className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-cyber-light hover:bg-cyber-purple/20"
                      onSelect={() => {
                        // Navigate to relevant section or filter results
                        console.log(`Selected: ${item} from ${category.title}`);
                        setQuery('');
                      }}
                    >
                      {item}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
