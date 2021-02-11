'use-strict';

class wordReplace{

    constructor({words, maxDepth, seperator = ' '})
    {
        this.numberLikeChars = {
            '1' : 'i',
            '4' : 'a',
            '0' : 'o'
        };

        this.charLikeNumbers = {
            'i' : '1',
            'a' : '4',
            'o' : '0'
        };

        this.seperator = seperator;
        this.maxDepth = maxDepth;
        this.words = words;

        
        this.wordsCharsLikeNumberControl();

    }

    wordsCharsLikeNumberControl()
    {
        const words = this.words;
        const numbers = Object.values(this.numberLikeChars);
        for(let word in words) {
            const regexpPatternValue = words[word];

            numbers.forEach(number => {
                if(word.includes(number)){
                    const splitted = word.split(number);
                    splitted.forEach( (charset, i) => {
                        const nextIndex = i+1;
                        const nextCharset = splitted[nextIndex] || false;
                        if(nextCharset) {
                            const pattern = new RegExp(charset+number+nextCharset, 'i');
                            const convertedString = word.replace(pattern, charset+this.charLikeNumbers[number]+nextCharset)
                            this.words[convertedString] = regexpPatternValue;
                        }
                    })
                    const pattern = new RegExp(number, 'gi');
                    const newWord = word.replace(pattern, this.charLikeNumbers[number])
                    this.words[newWord] = regexpPatternValue;
                }
            });

        }
    }

    /**
     * 
     * @param {string} text
     */
    begin(text)
    {
        text = text.replace(/  +/g, ' ');
        const steps = this.makeSteps(text);

        let wordSpace = {};

        steps.forEach( step => {
            wordSpace = this.makeWordMap(step, wordSpace);
        });

        return this.filter(wordSpace, text);
    }

    /**
     * 
     * @param {object} wordSpace
     * @param {string} orginalText
     */
    filter(wordSpace, orginalText)
    {
        for(let word in this.words) {

            const value = this.words[word];
            const targetString = wordSpace[word];

            if(targetString !== undefined) {
                
                const pattern = new RegExp(targetString, 'gi');
                orginalText = orginalText.replace(pattern, value);

            }

        }

        return orginalText;
    }

    /**
     * 
     * @param {array} stepArray 
     */
    makeWordMap(stepArray, currentHashMap)
    {
        let hashMap = {};
        
        stepArray.forEach(words => {
            const splitText = this.tokenization(words.join('')).split('')
            let tempString = '';
            splitText.forEach(char => {
                tempString = tempString+char;
                if(currentHashMap[tempString] === undefined) {
                    hashMap[tempString] = words.join(this.seperator);
                }

                const charLikeNumber = this.numberLikeChars[char] || false;

                if(charLikeNumber) {
                    const charLikeTempString = tempString+charLikeNumber;
                    if(currentHashMap[charLikeTempString] === undefined) {
                        hashMap[charLikeTempString] = words.join(this.seperator);
                    }
                }
                
            });
        });


        
        return {...hashMap, ...currentHashMap};
            
    }


    tokenization(string)
    {
        return string.toLowerCase().
        replace(/ö/gi, 'o').
        replace(/ç/gi, 'c').
        replace(/ş/gi, 's').
        replace(/ğ/gi, 'g').
        replace(/ü/gi, 'u').
        replace(/ı/gi, 'i').
        replace(/[^\w\s]/gi, '').
        replace(/  +/g, ' ').
        trim();
    }

    /**
     * 
     * @param {string} text
     */
    makeSteps(text)
    {
        const stringArray = text.split(this.seperator);
        let steps = [];

        for(let depth = 1; depth <= this.maxDepth; depth++) {

            steps.push(
                this.chunk(stringArray, depth)
            );


        }

        return steps;


    }

    /**
     * 
     * @param {array} array 
     * @param {int} size 
     */
    chunk(array, size)
    {
        return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
            array.slice(i * size, i * size + size)
        );
    }

}


export default wordReplace;