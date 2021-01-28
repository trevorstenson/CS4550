(function () {
  "use strict";

  let displayValue = '';
  let savedNum = 0;
  let savedOperation = null;
  let startNew = false;

  const setDisplayValue = (val) => {
    displayValue = val;
    document.getElementById("screen").textContent = val;
  }

  // basic value input handler
  const handleValue = (evt) => {
    let val = evt.target.textContent;
    if (startNew) {
      setDisplayValue(val);
    } else {
      setDisplayValue(displayValue += val);
    }
  }

  // operation handler
  const handleOperation = (evt) => {
    let val = evt.target.id;
    savedOperation = val;
    startNew = true;
    if (val === "minus" && displayValue === '') {
      savedNum = 0;
    } else {
      savedNum = parseFloat(displayValue);

    }
  }

  const handlePlusEqual = () => {
    if (savedOperation) {
      calculate();
    } else {
      savedOperation = 'plus';
      startNew = true;
    }
  }

  const calculate = () => {
    let curVal = parseFloat(displayValue);
    
    switch (savedOperation) {
      case "plus":
        console.log('adding')
        savedNum += curVal;
        break;
      case "minus":
        console.log('subbing')
        savedNum -= curVal;
        break;
      case "times":
        console.log("multiplying")
        savedNum *= curVal;
        break;
      case "divide":
        console.log('dividing')
        savedNum /= curVal;
        break;
    }
    setDisplayValue(savedNum);
    startNew = true;
    savedOperation = null;
  }

  const handleClear = () => {
    setDisplayValue('');
    savedOperation = null;
    startNew = false;
    savedNum = 0;
  }

  const addClickListeners = (ids, func) => {
    ids.forEach(id => {
      let elem = document.getElementById(id);
      elem.addEventListener("click", func);
    });
  }

  const init = () => {
    addClickListeners(["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "dec"], handleValue);
    addClickListeners(["minus", "times", "divide"], handleOperation);
    addClickListeners(["plusEqual"], handlePlusEqual)
    addClickListeners(["clear"], handleClear);
  }

  window.addEventListener("load", init);
})();