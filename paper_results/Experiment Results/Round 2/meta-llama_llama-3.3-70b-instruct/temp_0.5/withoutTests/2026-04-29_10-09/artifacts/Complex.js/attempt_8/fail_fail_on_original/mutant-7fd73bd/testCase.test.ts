import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle log function for complex numbers', () => {
    const complex = new Complex(2, 0);
    const logResult = complex.log();
    expect(logResult.re).toBeCloseTo(Math.log(2), 5);
    expect(logResult.im).toBeCloseTo(0, 5);
  });
});