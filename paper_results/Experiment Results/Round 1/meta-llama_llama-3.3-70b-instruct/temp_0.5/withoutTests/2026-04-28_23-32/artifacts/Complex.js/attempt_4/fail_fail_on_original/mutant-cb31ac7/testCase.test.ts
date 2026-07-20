import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cosm1(x);
    const expected = new Complex(-0.5 * x * x, 0);
    expect(result).toBeCloseTo(expected, 15);
  });
});