import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expectedRe = 0.5;
    const expectedIm = -0.5;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});