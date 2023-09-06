import React, {MouseEvent, useEffect, useState} from 'react';
import './App.css';
import leaf from './assets/leaf.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import {modes, kanji_sets, Position, url} from "./index";
import {ModeButtons} from "./components/mode_buttons"
import {KanjiLeaf} from "./components/kanji_leaf";
import {Game} from "./components/game";
import {GameScreen} from "./components/gamescreen/screen";

var TweenOne = require('rc-tween-one').default;


function generateIndex(mode: string) {
    console.log(mode)
    const set = kanji_sets[mode];
    const mode_size = set.length;
    return Math.floor(Math.random() * mode_size);
}

function getRandomKanji(mode: string) {
    let i  = generateIndex(mode);
    return kanji_sets[mode][i];
}


function DisplayKanji(kanji_mode: {mode: string;}) {
    const {mode} = kanji_mode;
    let curr_kanji = getRandomKanji(mode);
    const [kanji, setKanji] = useState<any>([])
    useEffect(() => {
        fetch(`${url}/${curr_kanji}`)
            .then((response) => response.json())
            .then((kanji) => {
                setKanji(kanji);
                let position: Position = {x: 0, y: 0}
                let leaf = new KanjiLeaf(kanji.kanji, position, kanji);
                falling_kanji.push(leaf)
                console.log(kanji);
            })
            .catch((error) => console.log(error));
  }, [curr_kanji]);
    return (
      <p>{kanji.kanji}</p>
  )}


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


let falling_kanji: KanjiLeaf[] = [];
function StartGame (kanji_mode: {mode: string;}) {
    const {mode} = kanji_mode;
    new Game(mode, "playing")
    const FallingKanji = () =>
        <TweenOne animation={{x:0, y:0}}>
        </TweenOne>;
    return (
        <FallingKanji/>
    );
}

/* disable start button until mode is selected */
const StartButton = (props: {setState:any}) => {
    const {setState} = props;
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
            console.log((e.target as Element).id)
            setState((e.target as Element).id);
    };
    return (
        <Button onClick={handleClick}
                key={"start"}
                id={"game"}
                variant="primary"
                className="btn-start">
                Start Game
        </Button>
    );
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // mode (choose mode), ready (mode chosen), game (playing game)
  const [state, setState] = useState("mode");
  const [mode, setMode] = useState<any>(null);
  useEffect(() => {
      if (mode !== null) {
          const interval = setInterval(() => {
              setState("ready");
          }, 20000);
          return () => {
              clearInterval(interval);
          };
      }
  }, [mode]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={leaf} className="App-logo" alt="logo" />
        <p className="display-name-jp">漢字落下</p>
          <p className="display-name-en">kanjirakka</p>
        <br/>
        <ModeButtons
            setMode={setMode}
        />
        <br/>
        {/* testing */}
        {mode !== null ? <StartButton setState={setState}/> : <p>Select mode to start!</p>}
        {mode !== null ? <DisplayKanji mode={mode}/> : <p>No Mode Selected.</p>}
        { state === "game" ? <GameScreen/> : <p>Game not started.</p> }
        { /* state === "game" ? <StartGame mode={mode}/> : <p>Game not started.</p> */ }
      </header>
    </div>
  );
}

export default App;
