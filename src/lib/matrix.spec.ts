import { test } from 'ava';
import { Matrix } from './matrix';

test('dot product', t => {

  const a = new Matrix(1, 3, [[23, 45, 75]]);
  const b = new Matrix(3, 2, [[11, 1], [22, 1], [33, 9]]);

  const c = a.dotProduct(b);

  t.is(c.data, [[3718, 743]])
});
