import {KanjiLeaf} from "./kanji_leaf";

export class Bucket {
    bucket?: KanjiLeaf[];

    constructor(bucket?: KanjiLeaf[]) {
        this.bucket = bucket;
    }

    startBucket(): void {
        if (typeof this.bucket === 'undefined') {
            this.bucket = [];
        }
    }

    addLeaf(kanji: KanjiLeaf): void {
        this.bucket?.push(kanji)
    }

}

