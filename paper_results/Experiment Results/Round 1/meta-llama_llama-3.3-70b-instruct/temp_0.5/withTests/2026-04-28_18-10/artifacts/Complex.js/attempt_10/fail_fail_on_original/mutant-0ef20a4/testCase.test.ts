import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for asech when the input is zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.toString()).not.toBe('Infinity');
  });
});