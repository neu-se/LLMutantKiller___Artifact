import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const complex = new Complex(1, 0);
    const result = complex.asinh();
    expect(result.re).toBeCloseTo(1.1752011660461475);
    expect(result.im).toBeCloseTo(0);
  });
});