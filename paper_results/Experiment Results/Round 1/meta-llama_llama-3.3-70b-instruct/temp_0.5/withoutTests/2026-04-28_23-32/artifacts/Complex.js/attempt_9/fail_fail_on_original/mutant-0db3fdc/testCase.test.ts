import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = Math.cos(x) - 1;
    const diff = Math.abs(result - expected);
    expect(diff).toBeLessThan(1e-10);
  });
});