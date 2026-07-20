import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(1, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});