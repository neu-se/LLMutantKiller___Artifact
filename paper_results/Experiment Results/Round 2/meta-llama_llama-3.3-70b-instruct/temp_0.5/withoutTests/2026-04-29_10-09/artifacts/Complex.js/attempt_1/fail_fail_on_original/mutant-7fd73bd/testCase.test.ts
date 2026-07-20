import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle log function for complex numbers', () => {
    const complex = new Complex(0, 1);
    const logResult = complex.log();
    expect(logResult.re).toBeCloseTo(0);
    expect(logResult.im).toBeCloseTo(Math.PI / 2);
  });
});