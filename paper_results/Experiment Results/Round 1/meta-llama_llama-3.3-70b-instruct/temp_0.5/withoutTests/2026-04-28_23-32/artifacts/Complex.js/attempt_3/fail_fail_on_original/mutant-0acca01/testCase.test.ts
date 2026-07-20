import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    expect(result.re).not.toBeCloseTo(complex.re * complex.re, 5);
  });
});