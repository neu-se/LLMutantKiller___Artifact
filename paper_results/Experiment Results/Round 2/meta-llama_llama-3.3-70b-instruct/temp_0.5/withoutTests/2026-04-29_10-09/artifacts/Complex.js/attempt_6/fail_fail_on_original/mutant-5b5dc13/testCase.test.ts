import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for complex numbers', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(-Infinity, 10);
  });
});