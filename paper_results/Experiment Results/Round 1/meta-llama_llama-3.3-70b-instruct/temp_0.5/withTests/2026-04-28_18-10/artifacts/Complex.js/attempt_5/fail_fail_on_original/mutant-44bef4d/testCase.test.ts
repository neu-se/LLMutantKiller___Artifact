import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    const expectedReal = -0.5403023058681398;
    const expectedImaginary = 0.8414709848078965;
    expect(result.re).toBeCloseTo(expectedReal, 5);
    expect(result.im).toBeCloseTo(expectedImaginary, 5);
  });
});