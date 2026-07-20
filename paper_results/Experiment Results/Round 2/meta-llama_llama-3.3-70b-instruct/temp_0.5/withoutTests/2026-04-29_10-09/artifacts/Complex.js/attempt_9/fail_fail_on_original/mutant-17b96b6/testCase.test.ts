import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a specific result for acoth when a is 1 and b is 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0);
  });
});