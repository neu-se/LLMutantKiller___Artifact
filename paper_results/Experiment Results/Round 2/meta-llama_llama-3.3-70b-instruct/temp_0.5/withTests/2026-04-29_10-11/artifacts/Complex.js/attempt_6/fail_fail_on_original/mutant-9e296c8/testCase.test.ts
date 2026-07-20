import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly for the original code', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    const originalResult = new Complex(-0.03086674725427066, -0.03341640786821245);
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});