import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly for the original code', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    const originalResult = new Complex(-0.03086674725427066, -0.03341640786821245);
    expect(Math.abs(result.re - originalResult.re)).toBeLessThan(1e-5);
    expect(Math.abs(result.im - originalResult.im)).toBeLessThan(1e-5);
  });
});