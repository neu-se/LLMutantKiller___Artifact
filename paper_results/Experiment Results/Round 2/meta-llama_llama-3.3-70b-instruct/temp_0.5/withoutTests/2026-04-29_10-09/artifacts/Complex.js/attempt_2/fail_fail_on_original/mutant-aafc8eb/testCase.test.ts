import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(0.1, 0.2);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(0.10517110634787055, 10);
    expect(result.im).toBeCloseTo(0.20133765724625776, 10);
  });
});