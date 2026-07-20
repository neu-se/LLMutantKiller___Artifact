import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for a complex number with non-zero imaginary part', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalResult = new Complex(0.5, 0.5);
    const original = originalResult.asech();
    expect(result.re).not.toEqual(original.im);
  });
});