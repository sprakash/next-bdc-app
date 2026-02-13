export function getAvailableLetters(filmmakers: { name: string }[]): string[] {   
    const lettersSet = new Set<string>(); 

    filmmakers.forEach((f) => {
        const lastName = getLastName(f.name);
        if(!lastName) return;

        const letter = lastName[0].toUpperCase();
        if (letter >= "A" && letter <= "Z") {
            lettersSet.add(letter);
        }
    });

    return Array.from(lettersSet).sort(); // <-- return **after** forEach
}

export function getLastName(name: string): string {
    const words = name.trim().split(/\s+/);
        if (words.length === 0) return "";

        let lastName = words[words.length - 1];

        // Special case: Ancestor
        if (lastName === "(Ancestor)" && words.length > 1) {
            lastName = words[words.length - 2];
        }

    return lastName;
}