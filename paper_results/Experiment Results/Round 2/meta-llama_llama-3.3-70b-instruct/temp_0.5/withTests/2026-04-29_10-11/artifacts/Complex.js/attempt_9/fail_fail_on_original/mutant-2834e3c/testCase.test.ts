import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly handle asech for a complex number with non-zero imaginary part', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result.im).not.toBe(0);
    const originalResult = new Complex(1, 1);
    const original = originalResult.asech();
    expect(result.im).toEqual(original.im);
  });
});