import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = -0.005;
    expect(result).toBeCloseTo(expected, 3);
  });
});