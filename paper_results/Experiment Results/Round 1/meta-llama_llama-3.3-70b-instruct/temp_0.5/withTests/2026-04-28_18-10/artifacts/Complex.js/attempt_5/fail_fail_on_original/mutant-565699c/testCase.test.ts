import { Complex } from './complex';

describe('Complex.js', () => {
  it('should return the correct result for the cosm1 function', () => {
    const x = 0.000001;
    const cosm1Result = Complex.prototype.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(cosm1Result).toBeCloseTo(expected, 10);
    const complex = new Complex(x, 0);
    const expm1Result = complex.expm1();
    expect(expm1Result.re).toBeCloseTo(Math.expm1(x), 10);
    expect(expm1Result.im).toBeCloseTo(0, 10);
  });
});