## Install

```
npm i @foxql/word-replace
```

## Usage
``` javascript
import wordReplace from '@foxql/word-replace';

const words = {
    'serefsiz' : 'INSULT'
};

const filter = new wordReplace({
    words : words,
    maxDepth : 3
});


filter.begin("serefsiz kelimesini içeren bir metin"); // INSULT kelimesini içeren bir metin

filter.begin("sere fsiz kelimesini içeren bir metin"); // INSULT kelimesini içeren bir metin

filter.begin("s              erefsiz kelimesini içeren bir metin"); // INSULT kelimesini içeren bir metin

filter.begin("serefs1z kelimesini içeren bir metin"); // INSULT kelimesini içeren bir metin

```