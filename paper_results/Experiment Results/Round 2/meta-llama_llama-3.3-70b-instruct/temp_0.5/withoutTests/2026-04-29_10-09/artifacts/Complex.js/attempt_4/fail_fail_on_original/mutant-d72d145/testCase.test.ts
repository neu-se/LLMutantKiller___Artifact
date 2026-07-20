import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for the acsc method', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(2.0943951023931953, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});