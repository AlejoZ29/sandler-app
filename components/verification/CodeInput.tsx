'use client';

interface CodeInputProps {
  code: string;
  onChange: (value: string) => void;
}

export const CodeInput = ({ code, onChange }: CodeInputProps) => {
  const renderFormattedCode = (code: string) => {
    const digits = code.padEnd(6, ' ').split('');
    const parts = [];
    
    for (let i = 0; i < 6; i++) {
      const digit = digits[i];
      
      parts.push(
        <span key={`digit-${i}`} className={digit === ' ' ? "text-gray-400" : "text-yellow-400"}>
          {digit === ' ' ? '0' : digit}
        </span>
      );
      
      if (i < 5) {
        parts.push(
          <span key={`dash-${i}`} className="text-black">
            -
          </span>
        );
      }
    }
    
    return parts;
  };

  return (
    <div className="relative border-dashed border-2 border-yellow-400 p-2 rounded-lg">
      <input
        type="text"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
        maxLength={6}
        autoFocus
      />
      <div className="text-center text-2xl font-mono tracking-widest bg-white rounded-lg px-6 py-3 min-w-[200px] cursor-pointer">
        {renderFormattedCode(code)}
      </div>
    </div>
  );
};
