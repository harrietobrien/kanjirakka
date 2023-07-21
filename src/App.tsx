import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

let url = "https://kanjiapi.dev/v1/kanji";
let kanji_dict = require('./kanji.json');

function generateIndex(mode: string) {
    let mode_size = kanji_dict[mode].length
    return Math.floor(Math.random() * mode_size);
}

function getKanji(mode: string) {
    let i  = generateIndex(mode)
    return kanji_dict[mode][i]
}

function DisplayKanji() {
    let curr_kanji = getKanji("1")
    const [kanji, setKanji] = useState<any>([])
    useEffect(() => {
        fetch(`${url}/${curr_kanji}`)
            .then((response) => response.json())
            .then((kanji) => {
                setKanji(kanji);
                console.log(kanji);
            })
            .catch((error) => console.log(error));
  }, [curr_kanji]);
    return (
      <p>{kanji.kanji}</p>
  )}

function ModeButtons() {
    return (
        <ButtonGroup>
            <Button variant="primary">All</Button>
            <Button variant="primary">Jouyou</Button>
            <Button variant="primary">Jinmeiyou</Button>
        </ButtonGroup>
    );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>KanjiRakka</p>
        <ModeButtons />
        <DisplayKanji />
      </header>
    </div>
  );
}

export default App;
