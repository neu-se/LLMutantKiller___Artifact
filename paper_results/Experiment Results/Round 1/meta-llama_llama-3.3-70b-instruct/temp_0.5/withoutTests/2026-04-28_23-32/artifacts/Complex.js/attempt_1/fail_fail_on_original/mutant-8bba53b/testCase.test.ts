import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosm1(1);
    expect(result).toBeCloseTo(-0.45969769413186023);
  });
});