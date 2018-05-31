import { test } from 'ava';
import { FeedFoward } from './feedfoward';

test('Predict', t => {
  const inputs = [1, 1];
  const brain = new FeedFoward(2, 10, 1);
  const output = brain.Predict(inputs);
  t.is(output.length, 1);
});
