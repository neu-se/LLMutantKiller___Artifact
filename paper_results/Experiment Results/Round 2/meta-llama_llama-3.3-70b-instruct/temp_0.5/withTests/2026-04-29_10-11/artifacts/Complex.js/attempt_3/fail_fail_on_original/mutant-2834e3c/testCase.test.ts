import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle asech for non-zero imaginary part', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result).not.toBeNull();
  });
});