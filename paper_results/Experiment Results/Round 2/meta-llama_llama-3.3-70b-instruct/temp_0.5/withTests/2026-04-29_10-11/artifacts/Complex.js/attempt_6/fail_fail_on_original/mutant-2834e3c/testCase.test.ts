import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate asech for a complex number with non-zero imaginary part', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result.im).not.toBe(0);
  });
});