import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for the logHypot function', () => {
    const a = 1;
    const b = 1;
    const result = Math.log(a * a + b * b) * 0.5;
    const complex = new Complex(a, b);
    const logHypotResult = complex.log().re;
    expect(logHypotResult).toBeCloseTo(result, 10);
  });
});