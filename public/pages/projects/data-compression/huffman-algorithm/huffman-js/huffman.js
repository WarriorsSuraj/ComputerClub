/*
README:

huffman algorithm: lossless data compression algorithm

it gives priority to frequently reoccuring items
example: compress the string AABBC
A and B will be given shorter codes, while C will be given a longer one

practicality:
used in JPEG, MP3, and ZIP files

wikipedia article: https://en.wikipedia.org/wiki/Huffman_coding

*/

class Char {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

//! IMPORTANT IF NEEDED FOR USE: make a new instance for each string that needs to be encoded
class Huffman {
    constructor() {
        this.tree = null;
        this.orderedChars = [];
        this.chars = {};
    }

    async compress(string) {
        for (const char of string) {
            if (this.chars[char]) this.chars[char].freq++; // if the char is already in our map, then increase count
            else this.chars[char] = new Char(char, 1); // otherwise initialize it in our map
        }

        // now we sort by least frequent -> most frequent
        for (const char in this.chars) {
            this.orderedChars.push(this.chars[char]);
        }

        // sort from least count to greatest count
        this.orderedChars.sort((a, b) => {
            return a.freq - b.freq;
        });

        // now we need to construct the tree that this algorithm uses
        // combine the 2 smallest chars together to from a "team"
        // if multiple exist, choose any (we will choose the first)
        const chars = this.orderedChars;

        while (chars.length > 1) {
            const char1 = chars.shift();
            const char2 = chars.shift();

            const newchar = new Char(null, char1.freq + char2.freq);
            newchar.left = char1;
            newchar.right = char2;

            chars.push(newchar);
            chars.sort((a, b) => {
                return a.freq - b.freq;
            });

            //this.tree.push([char1, char2]);
        }

        // stores the "root" char (since it's a tree)
        this.tree = chars[0] || null;

        const codes = await this.encode();

        // put it all together now
        let encoded = "";
        for (const char of string) {
            encoded += codes[char];
        }

        return encoded;
    }

    async encode() {
        const codes = {}; // map chars to the codes
        await this.traverse(this.tree, "", codes);

        return codes;
    }

    async traverse(char, code, codes) {
        if (char.char && char.char !== null) {
            codes[char.char] = code || "0";
        }

        if (char.left) {
            await this.traverse(char.left, `${code}0`, codes); // add 0 when going left
        }

        if (char.right) {
            await this.traverse(char.right, `${code}1`, codes); // add 1 when going right
        }
    }

    async decode(encoded) {
        // use the tree and work our way back
        let lvl = this.tree;
        let decoded = "";

        for (const char of encoded) {
            switch (char) {
                case "0":
                    lvl = lvl.left;
                    break;

                case "1":
                    lvl = lvl.right;
                    break;

                default: break;
            };

            if (lvl.char && char.char !== null) {
                decoded += lvl.char;
                lvl = this.tree;
            }
        }

        return decoded;
    }
}

// example
try {
    const huffman = new Huffman();

    // test encode
    const compressed = await huffman.compress("hey it works");
    console.log("encoded string", compressed);

    // test decode
    const decompressed = await huffman.decode(compressed);
    console.log("decoded string", decompressed);
} catch (err) {
    console.error(err);
}