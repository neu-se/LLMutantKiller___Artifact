import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    const expectedRe = 0.2717525853198426;
    const expectedIm = 0.2717525853198426;
    expect(result.re).toBeCloseTo(expectedRe, 6);
    expect(result.im).toBeCloseTo(expectedIm, 6);
  });
});