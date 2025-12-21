import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const equals = () => {
    if (operator && prevValue !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const buttonClass = "h-12 text-lg font-medium rounded hover:bg-muted/80 transition-colors";

  return (
    <div className="h-full flex flex-col bg-secondary p-2">
      {/* Display */}
      <div className="bg-card p-4 mb-2 text-right rounded">
        <div className="text-3xl font-light text-card-foreground truncate">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-1 flex-1">
        <button className={`${buttonClass} bg-muted text-card-foreground`} onClick={() => clear()}>C</button>
        <button className={`${buttonClass} bg-muted text-card-foreground`} onClick={() => setDisplay(String(-parseFloat(display)))}>±</button>
        <button className={`${buttonClass} bg-muted text-card-foreground`} onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
        <button className={`${buttonClass} bg-primary text-primary-foreground`} onClick={() => performOperation('/')}>÷</button>

        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('7')}>7</button>
        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('8')}>8</button>
        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('9')}>9</button>
        <button className={`${buttonClass} bg-primary text-primary-foreground`} onClick={() => performOperation('*')}>×</button>

        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('4')}>4</button>
        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('5')}>5</button>
        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('6')}>6</button>
        <button className={`${buttonClass} bg-primary text-primary-foreground`} onClick={() => performOperation('-')}>−</button>

        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('1')}>1</button>
        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('2')}>2</button>
        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDigit('3')}>3</button>
        <button className={`${buttonClass} bg-primary text-primary-foreground`} onClick={() => performOperation('+')}>+</button>

        <button className={`${buttonClass} bg-card text-card-foreground col-span-2`} onClick={() => inputDigit('0')}>0</button>
        <button className={`${buttonClass} bg-card text-card-foreground`} onClick={() => inputDecimal()}>.</button>
        <button className={`${buttonClass} bg-accent text-accent-foreground`} onClick={() => equals()}>=</button>
      </div>
    </div>
  );
};
