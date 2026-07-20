import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});