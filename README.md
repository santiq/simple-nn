# Simple-nn

A simple neural network implementation for learning purposes

# ATTENTION!  

This is NOT a complete implementation of a neural network library (yet) and it don't pretend to be.

Also, the matrix class may not be have all the possibles and desired functionalities

Please DO NOT USE THIS LIBRARY on production.

# Example

 # XOR operation

```javascript

import { FeedFoward } from './lib/feedfoward';

const options = {
  bias_random_max: 4,
  bias_random_min: 1,
  learning_rate: 0.2,
  weights_random_max: 4,
  weights_random_min: 1,
}
// Hidden layer must have more than 1 perceptron in order to solve XOR
const brain = new FeedFoward(2, 10, 1, options);

const training_data = [ 
  {
    inputs: [0, 1],
    label: [1],
  },
  {
    inputs: [1, 0],
    label: [1],
  },
  {
    inputs: [0, 0],
    label: [0],
  },
  {
    inputs: [1, 1],
    label: [0],
  } 
];

const iterations = 10000;
for(let i = 0; i< iterations; i++) {
  const index = Math.floor(Math.random() * training_data.length);
  brain.Train(training_data[index].inputs, training_data[index].label)
}

// tslint:disable-next-line:no-console
console.log(brain.Predict([0,1]))
// tslint:disable-next-line:no-console
console.log(brain.Predict([1,0]))
// tslint:disable-next-line:no-console
console.log(brain.Predict([1,1]))
// tslint:disable-next-line:no-console
console.log(brain.Predict([0,0]))

```