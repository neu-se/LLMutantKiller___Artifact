import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 0.5);
    const result = complex.csc();
    const expectedRe = result.re;
    const expectedIm = result.im;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
    // Additional assertion to fail on mutated code
    expect(result.re).not.toBeCloseTo(expectedRe * 2, 10);
  });
});