import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acsc', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(complex.acsc().re).not.toBeNaN();
    expect(complex.acsc().im).not.toBeNaN();
  });
});