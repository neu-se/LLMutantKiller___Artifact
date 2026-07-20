import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should parse null string and not throw an error', () => {
    const complex = new Complex(null);
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});