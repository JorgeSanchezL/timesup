export enum WordState {
    NOT_VIEWED = 'NOT_VIEWED',
    VIEWED_NOT_GUESSED = 'VIEWED_NOT_GUESSED',
    VIEWED_GUESSED = 'VIEWED_GUESSED',
    CONFIRMED = 'CONFIRMED',
}

export class Word {
    team: string
    state: WordState
    private viewedInRound: boolean

    constructor(team: string, state: WordState) {
        this.team = team
        this.state = state
        this.viewedInRound = false
    }

    getViewedInRound(): boolean {
        return this.viewedInRound
    }

    setViewedInRound(viewedInRound: boolean): void {
        this.viewedInRound = viewedInRound
    }
}

export class WordList {
    wordsInformation: { [key: string]: Word }
    words: string[]
    pointedWord: string
    wordsLeft: boolean

    constructor(words: string[]) {
        words = words.sort(() => Math.random() - 0.5) // Shuffle the words
        this.wordsInformation = {}
        words.forEach(wordInfo => {
            this.wordsInformation[wordInfo] = new Word('', WordState.NOT_VIEWED)
        })
        this.words = words
        this.pointedWord = ""
        this.wordsLeft = true
    }

    nextWord() {
        if (!this.wordsLeft) {
            this.pointedWord = ""
            return
        }

        let index = this.words.indexOf(this.pointedWord)
        do {
            index++
            if (index >= Object.keys(this.words).length) { // If we're at the end of the list, go back to the beginning
                index = 0
                this.resetViewedInRound()
            }
            if (index === this.words.indexOf(this.pointedWord)) {
                this.wordsLeft = this.getWordState(this.pointedWord) !== WordState.VIEWED_GUESSED && this.getWordState(this.pointedWord) !== WordState.CONFIRMED
                break
            }
        } while (
            this.getWordState(this.words[index]) !== WordState.NOT_VIEWED
            &&
            this.getWordState(this.words[index]) !== WordState.VIEWED_NOT_GUESSED
            ||
            this.getWordViewedInRound(this.words[index])
        )
        this.pointedWord = this.words[index]
    }

    getWordViewedInRound(word: string): boolean {
        return this.wordsInformation[word].getViewedInRound()
    }

    resetViewedInRound(): void {
        this.words.forEach(word => {
            this.wordsInformation[word].setViewedInRound(false)
        })
    }

    confirmWordList(currentTeam: string): void {
        this.words.forEach(word => {
            if (this.getWordState(word) === WordState.VIEWED_GUESSED) {
                this.setWordState(word, WordState.CONFIRMED)
                this.setWordTeam(word, currentTeam)
            }
            if (this.getWordState(word) === WordState.VIEWED_NOT_GUESSED) {
                this.setWordState(word, WordState.NOT_VIEWED)
                this.wordsLeft = true
            }
            if (this.getWordState(word) === WordState.NOT_VIEWED) {
                this.wordsLeft = true
            }
        })
    }

    viewWord(): void {
        this.setWordState(this.pointedWord, WordState.VIEWED_NOT_GUESSED)
    }

    unviewWord(): void {
        this.setWordState(this.pointedWord, WordState.NOT_VIEWED)
        this.wordsLeft = true
    }

    guessWord(): void {
        this.setWordState(this.pointedWord, WordState.VIEWED_GUESSED)
    }

    getWordState(word: string): WordState {
        return this.wordsInformation[word].state
    }

    setWordState(word: string, state: WordState): void {
        this.wordsInformation[word].state = state
    }

    getWordTeam(word: string): string {
        return this.wordsInformation[word].team
    }

    setWordTeam(word: string, team: string): void {
        this.wordsInformation[word].team = team
    }

    reset(): void {
        this.words.forEach(word => {
            this.setWordState(word, WordState.NOT_VIEWED)
            this.setWordTeam(word, '')
        })
        this.wordsLeft = true
        this.pointedWord = ""
    }
}