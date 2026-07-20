import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for cosm1 function', () => {
    const complex = new Complex(1);
    const result = complex.cosm1(0.1);
    expect(result).toBeCloseTo(-0.005, 6);
  });
});