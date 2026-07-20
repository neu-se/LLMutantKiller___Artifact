import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not return Infinity when a is not zero in asech', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});