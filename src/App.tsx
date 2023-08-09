import React, {MouseEvent, useEffect, useState} from 'react';
import './App.css';
import leaf from './leaf.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
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
]

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
                <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                    <Tooltip id="tooltip" className="tooltip">
                        <strong>{mode.tooltip.title}</strong>
                        <br></br>
                        {mode.tooltip.msg}
                    </Tooltip>
                    }
                    delay={{ show: 250, hide: 0 }}
                    trigger={["hover"]}
                    >
                <Button
                    key={i}
                    id={mode.id}
                    variant="primary"
                    className="btn">
                    {mode.name}
                </Button></OverlayTrigger>
            ))}
        </ButtonGroup>
    );
}

function StartGame(kanji_mode: {mode: string;}) {

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
                id={"start"}
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
          if (state === "game") {
              StartGame(mode);
          }
          return () => {
              clearInterval(interval);
          };
      }
  }, [mode, state]);
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
        { /* mode !== null ? <ShowKanji mode={mode}/> : <p>No Mode Selected.</p> */ }
      </header>
    </div>
  );
}

export default App;
