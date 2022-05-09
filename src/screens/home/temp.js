class Paper {

    constructor() {
        this.words = [];
        this.maxWordCount = 0;
    }

    getWords() {
        return this.words;
    }

    getMaxWordsCount() {
        return this.maxWordCount;
    }
}

class A4Paper extends Paper {

    constructor(words) {
        super();
        this.words = words;
        this.maxWordCount = 100;
    }
}

class A3Paper extends Paper {

    constructor(words) {
        super();
        this.words = words;
        this.maxWordCount = 200;
    }
}

class A2Paper extends Paper {

    constructor(words) {
        super();
        this.words = words;
        this.maxWordCount = 300;
    }
}

class A1Paper extends Paper {

    constructor(words) {
        super();
        this.words = words;
        this.maxWordCount = 400;
    }
}

let paper = [];

let A1Paper = new A1Paper("hello world this is a1 paper");
let A2Paper = new A1Paper("hello world this is a2 paper");
let A1Paper = new A1Paper("hello world this is a1 paper");
let A4Paper = new A1Paper("hello world this is a4 paper");
