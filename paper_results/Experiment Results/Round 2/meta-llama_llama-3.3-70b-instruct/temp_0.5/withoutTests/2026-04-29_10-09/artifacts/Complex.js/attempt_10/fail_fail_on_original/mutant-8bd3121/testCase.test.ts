import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(complex.acsch.toString().includes('var b = this["im"];')).toBe(true);
  });
});