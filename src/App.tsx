import React, {MouseEvent, useRef, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// let timersBrowserify = require("timers-browserify")
import kanji_json from "./kanji.json";
interface kanjiSet {
  [key: string]: string[];
}
const kanji_sets: kanjiSet = kanji_json;

const url = "https://kanjiapi.dev/v1/kanji";

function generateIndex(mode: string) {
    console.log(mode)
    const set = kanji_sets[mode];
    const mode_size = set.length;
    return Math.floor(Math.random() * mode_size);
}

function getRandomKanji(mode: string) {
    let i  = generateIndex(mode)
    return kanji_sets[mode][i]
}

let falling_kanji: string[] = [];

function DisplayKanji(kanji_mode: {mode: string;}) {
    const {mode} = kanji_mode;
    let curr_kanji = getRandomKanji(mode);
    const [kanji, setKanji] = useState<any>([])
    useEffect(() => {
        fetch(`${url}/${curr_kanji}`)
            .then((response) => response.json())
            .then((kanji) => {
                setKanji(kanji);
                falling_kanji.push(kanji)
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

const ShowKanji = (kanji_mode: {mode: string;}) => {
    const {mode} = kanji_mode;
    return (
        <ul>
            {kanji_sets[mode]?.map((kanji) => (
                <li>{kanji}</li>
            ))}
        </ul>
    );
}

const ModeButtons = (setter: {setMode: any;} ) => {
    const {setMode} = setter;
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        console.log((e.target as Element).id)
        setMode((e.target as Element).id);
    };
    return (
        <ButtonGroup onClick={handleClick}>
            {modes?.map((mode, i) => (
                <Button
                    key={i}
                    id={mode.id}
                    variant="primary">
                    {mode.name}
                </Button>
            ))}
        </ButtonGroup>
    );
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState("mode");
  const [mode, setMode] = useState<any>(null);
  useEffect(() => {
      if (mode !== null) {
          const interval = setInterval(() => {
              setState("game");
          }, 20000);
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
        {mode !== null ? <DisplayKanji mode={mode}/> : <p>No Mode Selected.</p>}
        {mode !== null ? <ShowKanji mode={mode}/> : <p>No Mode Selected.</p>}
      </header>
    </div>
  );
}

export default App;
