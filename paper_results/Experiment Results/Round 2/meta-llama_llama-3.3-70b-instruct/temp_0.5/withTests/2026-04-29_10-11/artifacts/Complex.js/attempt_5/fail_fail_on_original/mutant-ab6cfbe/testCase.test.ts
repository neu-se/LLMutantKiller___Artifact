import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate log correctly for negative real numbers', () => {
    const complex = new Complex(-1);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(1));
    expect(result.im).toBeCloseTo(Math.PI);
  });
});