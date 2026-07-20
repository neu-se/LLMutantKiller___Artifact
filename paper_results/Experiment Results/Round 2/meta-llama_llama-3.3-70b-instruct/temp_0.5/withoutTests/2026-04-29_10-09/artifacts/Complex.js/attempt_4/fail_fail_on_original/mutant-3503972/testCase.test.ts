import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const originalResult = new Complex(1, -1).asinh();
    expect(result.re).not.toBeCloseTo(originalResult.re, 5);
    expect(result.im).not.toBeCloseTo(originalResult.im, 5);
  });
});