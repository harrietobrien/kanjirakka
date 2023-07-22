import React, {MouseEvent, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let timersBrowserify = require("timers-browserify")

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
    // const {mode} = kanji_mode;
    let curr_kanji = getKanji("3");
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

const modes = [
    {name: 'All', id:'all'},
    {name: 'Jouyou', id:'jouyou'},
    {name: 'Jinmeiyou', id:'jinmeiyou'}
];


const ModeButtons = (setter: {setMode: any;} ) => {
    const {setMode} = setter;
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.name);
        setMode(e.currentTarget.id);
    };
    return (
        <ButtonGroup onClick={handleClick}>
            {modes.map((mode) => (
                <Button
                    id={mode.id}
                    variant="primary">
                    {mode.name}
                </Button>
            ))}
        </ButtonGroup>
    );
}

function App() {
  const [state, setState] = useState("mode");
  const [mode, setMode] = useState(null);
  let kanji_set = [];
  useEffect(() => {
      if (mode !== null) {
          kanji_set = kanji_dict[mode]

          const interval = setInterval(() => {
              setState("game");
          }, 1000);
          return () => {
              clearInterval(interval);
          };
      }
  }, [mode]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>KanjiRakka</p>
        <ModeButtons
            setMode={setMode}
        />
        {mode !== null ? <DisplayKanji/> : <p>"nor"</p>}
      </header>
    </div>
  );
}

export default App;
