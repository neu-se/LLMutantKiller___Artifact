import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle null input correctly', () => {
    const complex = new Complex(null);
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
    expect(Object.keys(complex).length).toBe(2);
  });
});