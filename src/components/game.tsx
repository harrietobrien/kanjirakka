import {Bucket} from "./bucket";
import {kanji_sets, Position} from "../index";
import {KanjiLeaf} from "./kanji_leaf";

export class Game {
    mode: string;
    status: string;
    bucket?: Bucket;

    constructor(mode: string, status: string, bucket?: Bucket) {
        this.mode = mode;
        this.status = status;
        this.bucket = bucket;
    }

    startBucket() {
        if (typeof this.bucket === 'undefined') {
            this.bucket = new Bucket()
            this.bucket.startBucket()
        } else {
            throw new Error('bucket not bucketing')
        }
    }

    generateIndex(): number {
        const set = kanji_sets[this.mode];
        const mode_size = set.length;
        return Math.floor(Math.random() * mode_size);
    }

    getRandomKanji(): string {
        let i  = this.generateIndex();
        return kanji_sets[this.mode][i];
    }

    startGame() {
        let position: Position = {x:0, y:0};
        let curr_kanji = new KanjiLeaf(this.getRandomKanji(), position);
        this.bucket?.addLeaf(curr_kanji);

    }


}