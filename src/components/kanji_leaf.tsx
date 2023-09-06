import {KanjiJson, Position, isKanjiJson, url} from "../index";

export class KanjiLeaf {
    readonly kanji: string;
    position?: Position;
    kanjiObj?: KanjiJson;
    correct?: boolean;

    constructor(kanji: string, position?: Position, kanjiObj?: KanjiJson) {
        this.kanji = kanji;
        this.position = position;
        this.kanjiObj = kanjiObj;
        this.correct = false;
    }

    getKanjiJson() {
        if (typeof this.kanjiObj == "undefined") {
            fetch(`${url}/${this.kanji}`)
                .then((response) => response.json())
                .then((kanji) => {
                    this.kanjiObj = kanji;
                    // falling_kanji.push(this)
                    console.log(kanji);
                })
                .catch((error) => console.log(error));
        }
    }

    updatePosition(): void {
    }

    getUnicode(): string | undefined {
        if (isKanjiJson(this.kanjiObj)) {
            return this.kanjiObj.unicode;
        }
    }

    getJLPT(): number | undefined {
        if (isKanjiJson(this.kanjiObj)) {
            return this.kanjiObj.jlpt;
        }
    }

    getGrade(): number | undefined {
        if (isKanjiJson(this.kanjiObj)) {
            return this.kanjiObj.grade;
        }
    }

    getStrokeCount(): number | undefined {
        if (isKanjiJson(this.kanjiObj)) {
            return this.kanjiObj.stroke_count;
        }
    }

    getMeanings(): string[] | undefined {
        if (isKanjiJson(this.kanjiObj)) {
            return this.kanjiObj.meanings;
        }
    }

    getHeisigKeyword(): string | undefined {
        // unique Heisig mnemonic keyword
        if (isKanjiJson(this.kanjiObj)) {
            return this.kanjiObj.heisig_en;
        }
    }
}