import _ from "lodash";

const randomSecret = () => {
  return _.sampleSize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4).join("");
}

const testSecret = (guess, secret) => {
  console.log('secret is: ', secret)
  if (!isFour(guess)) {
    return {errorMsg: "Guess must be a length of four."};
  } else if (!isUnique(guess)) {
    return {errorMsg: "Ensure your input is four unique digits."}
  } else {
    let placeMatches = [...guess].map((c, i) => [c, secret[i]]).filter(([a, b]) => a === b).length;
    let valueMatches = ([...guess].filter(c => secret.includes(c)).length) - placeMatches;
    let hintString = `${placeMatches} bulls, ${valueMatches} cows`
    return {guess: guess, hint: hintString};
  }
}

const gameOver = (guess, results) => {
  return results.map(r => r.guess).filter(x => x === guess).length > 0;
}

const isFour = (input) => {
  return input.length === 4;
}

const isUnique = (input) => {
  return new Set(input.split("")).size === 4;
}

export { randomSecret, testSecret, gameOver };