import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0.5535743588970452);
    expect(result.im).toBeCloseTo(-0.402359478108525);
  });
});