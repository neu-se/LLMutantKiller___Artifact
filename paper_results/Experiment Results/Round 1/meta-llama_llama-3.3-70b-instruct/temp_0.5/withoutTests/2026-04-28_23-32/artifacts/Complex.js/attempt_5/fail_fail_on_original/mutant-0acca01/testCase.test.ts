import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const originalResult = new Complex(0.5493061443340549, -0.5493061443340549);
    expect(result.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});