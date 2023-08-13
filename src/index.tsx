import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import kanji_json from "./kanji.json";

export const modes = [
    {name: 'All', id:'all',
        tooltip: {title:'All Characters', msg:'13,000+ available kanji'}},
    {name: 'Jōyō Kanji (常用漢字)', id:'jouyou',
        tooltip: {title:'Common Kanji', msg:'"regular-use kanji"'}},
    {name: 'Jinmeiyō Kanji (人名用漢字)', id:'jinmeiyou',
        tooltip: {title:'Name Kanji', msg:'(registered personal names)'}},
];

const grades = [
    {name: '1', id: 'grade-1'},
    {name: '2', id: 'grade-2'},
];


export interface Position {
  x: number;
  y: number;
}

export interface KanjiJson {
    kanji: string;
    grade: number;
    stroke_count: number;
    meanings: string[];
    kun_readings: string[];
    on_readings: string[];
    name_readings: string[];
    jlpt: number;
    unicode: string;
    heisig_en: string
}

export function isKanjiJson(obj: any): obj is KanjiJson {
    const schema: Record<keyof KanjiJson, string> = {
        kanji: 'string',
        grade: 'number',
        stroke_count: 'number',
        meanings: 'array',
        kun_readings: 'array',
        on_readings: 'array',
        name_readings: 'array',
        jlpt: 'number',
        unicode: 'string',
        heisig_en: 'string',
    };
    const missingProperties = Object.keys(schema)
        .filter(key => obj[key] === undefined)
        .map(key => key as keyof KanjiJson)
        .map(key => new Error(`KanjiJson is missing ${key} ${schema[key]}`));
    return missingProperties.length === 0;
}

interface kanjiSet {
  [key: string]: string[];
}
export const kanji_sets: kanjiSet = kanji_json;

export const url = "https://kanjiapi.dev/v1/kanji";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
