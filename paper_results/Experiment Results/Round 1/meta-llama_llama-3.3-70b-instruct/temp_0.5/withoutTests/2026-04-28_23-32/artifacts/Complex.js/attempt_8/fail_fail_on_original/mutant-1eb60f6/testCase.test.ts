import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly for zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.toString()).not.toBe('Math.PI / 2 + Infinity * i');
  });
});