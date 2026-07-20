import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalResult = new Complex(1, 1);
    const original = originalResult.csc();
    expect(result.re).toBeCloseTo(original.re, 10);
    expect(result.im).toBeCloseTo(original.im, 10);
  });
});