import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.030337690287659925, 10);
    expect(result.im).toBeCloseTo(-0.030337690287659925, 10);
  });
});