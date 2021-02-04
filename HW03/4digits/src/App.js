import { useState } from 'react';
import { randomSecret, testSecret, gameOver } from './game';
import './App.css';

const Controls = ({resetGame, guess}) => {
  const [input, setInput] = useState("");

  const catchEnter = (e) => {
    if (e.key === "Enter") {
      submitGuess(input);
    }
  };

  const submitGuess = (input) => {
    guess(input);
    setInput("");
  }

  return (
      <div className="row">
        <div className="column column-10">
          <h3>Input:</h3>
        </div>
        <div className="column column-20">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={catchEnter} maxLength="4"/>
        </div>
        <div className="column column-25">
          <button className="button" onClick={e => submitGuess(input)}>Guess</button>
          <button className="button" onClick={resetGame}>Reset</button>
        </div>
      </div>
  );
}

const Error = ({errString}) => {
  if (errString  === "") {
    return null;
  } else {
    return (
      <div id="errorRow" className="row">
        <div className="column column-33">
          <b>{errString}</b>
        </div>
      </div>
    );
  }
}

const Outcome = ({won, secret, reset}) => {
  let endMsg = won ? "You won!" : "You lost!";
  return (
    <div className="container">
      <div className="row">
        <div className="column column-50">
          <h2>{endMsg} The secret value was: {secret}</h2>
        </div>
      </div>
      <div className="row">
        <div className="column column-25">
          <button className="button" onClick={reset}>Reset Game</button>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const [secret, setSecret] = useState(randomSecret());
  const [results, setResults] = useState([]);
  const [remaining, setRemaining] = useState(8);
  const [errString, setErr] = useState("");

  const resetGame = () => {
    setSecret(randomSecret());
    setResults([]);
    setRemaining(8);
  }

  const guess = (guess) => {
    let nextResult = testSecret(guess, secret);
    if (nextResult.errorMsg) {
      setErr(nextResult.errorMsg);
    } else {
      setErr("");
      setResults([...results, nextResult]);
      setRemaining(remaining - 1);
    }
  }

  const isGameWon = gameOver(secret, results);
  const isGameLost = remaining === 0;
  
  if (isGameWon) {
    return <Outcome won={true} secret={secret} reset={resetGame}/>
  } else if (isGameLost) {
    return <Outcome won={false} secret={secret} reset={resetGame}/>
  } else {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="column column-33">
              <h2>Guesses Remaining: {remaining}</h2>
            </div>
          </div>
          <Error errString={errString}/>
          <Controls resetGame={resetGame} guess={guess}/>
          <div className="row">
            <div className="column column-10"></div>
            <div className="column column-20"><h4>Guess</h4></div>
            <div className="column column-25"><h4>Result</h4></div>
          </div>
          {results.map((result, index) => {
            return (
              <div className="row" key={index}>
                <div className="column column-10"></div>
                <div className="column column-20"><b>{result.guess}</b></div>
                <div className="column column-25"><b>{result.hint}</b></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
