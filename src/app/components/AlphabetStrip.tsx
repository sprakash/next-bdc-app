type AlphabetStripProps = {
    activeLetter?: string;
    availableLetters: string[];
    onSelectLetter: (letter?: string) => void;
}

export function AlphabetStrip({activeLetter,  
      availableLetters, 
      onSelectLetter } : AlphabetStripProps) {
        const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
        return (
            <section>
                <div className="flex items-center gap-2 overflow-x-auto py-2">
                    <button 
                    onClick={() => onSelectLetter(undefined)}
                    className={`px-2 py-1 rounded font-semibold ${
                    !activeLetter ? 'bg-purple-700 text-white cursor-pointer' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                        Reset
                    </button>
                     {/* Letters */}
                        {letters.map((letter) => {
                            const isDisabled = availableLetters && !availableLetters.includes(letter);

                            return (
                            <button
                                key={letter}
                                onClick={() => onSelectLetter(letter)}
                                disabled={isDisabled}
                                className={`
                                px-2 py-1 rounded font-semibold
                                ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-purple-500 hover:text-white'}
                                transition cursor-pointer
                                `}
                            >
                                {letter}
                            </button>
                            );
                    })}
                </div>
            </section>
         );
}