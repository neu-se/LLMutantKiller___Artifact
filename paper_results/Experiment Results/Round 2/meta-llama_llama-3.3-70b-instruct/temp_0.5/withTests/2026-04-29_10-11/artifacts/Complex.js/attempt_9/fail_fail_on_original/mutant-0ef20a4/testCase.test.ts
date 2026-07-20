import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return Infinity when asech is called with zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.toString()).toBe('Infinity');
  });
});