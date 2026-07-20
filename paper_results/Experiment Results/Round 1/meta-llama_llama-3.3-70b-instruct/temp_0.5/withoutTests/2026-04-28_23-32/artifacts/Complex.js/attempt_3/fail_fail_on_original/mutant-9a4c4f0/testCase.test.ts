import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.000001;
    const result = Complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});