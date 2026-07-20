import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(0.01);
    const result = complex.cosm1(0.01);
    expect(result).toBeCloseTo(-0.000049958347, 6);
  });
});