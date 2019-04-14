import autoBind from 'auto-bind';
import React, { Component } from 'react';
import { randomInt } from '../shared/utils/random';

function newMultiplicationTask(minValue, maxValue) {
  const factor1 = randomInt(minValue, maxValue);
  const factor2 = randomInt(minValue, maxValue);
  const product = factor1 * factor2;
  const key = `${factor1}|${factor2}`;
  return { key, factor1, factor2, product };
}

function getMultiplicationTasks(exerciseCount, minValue, maxValue) {
  const keys = new Set();
  const arr = [];

  while (arr.length < exerciseCount) {
    const task = newMultiplicationTask(minValue, maxValue);
    if (!keys.has(task.key)) {
      keys.add(task.key);
      arr.push(task);
    }
  }

  return arr;
}

export default class MultiplicationTablePractice extends Component {
  constructor(props) {
    super(props);
    autoBind.react(this);
    this.state = {
      exercises: getMultiplicationTasks(6, 1, 10),
      exerciseCount: 6,
      showResults: false
    };
  }

  handleShowResultsChange(event) {
    this.setState({
      showResults: event.target.checked
    });
  }

  handleExerciseCountChange(event) {
    const exerciseCount = Math.max(1, Math.floor(event.target.value));
    this.setState({
      exerciseCount: exerciseCount,
      exercises: getMultiplicationTasks(exerciseCount, 1, 10)
    });
  }

  render() {
    const { exercises, exerciseCount, showResults } = this.state;
    return (
      <div>
        <div>
          <input type="checkbox" checked={showResults} onChange={this.handleShowResultsChange} />
          <span>Ergebnisse anzeigen</span>
        </div>
        <input type="number" value={exerciseCount} onChange={this.handleExerciseCountChange} />
        {exercises.map(exercise => (
          <div key={exercise.key}>
            <span>{exercise.factor1}</span>
            <span> x </span>
            <span>{exercise.factor2}</span>
            <span> = </span>
            <span>{showResults ? exercise.product : '___'}</span>
          </div>
        ))}
      </div>
    );
  }
}
