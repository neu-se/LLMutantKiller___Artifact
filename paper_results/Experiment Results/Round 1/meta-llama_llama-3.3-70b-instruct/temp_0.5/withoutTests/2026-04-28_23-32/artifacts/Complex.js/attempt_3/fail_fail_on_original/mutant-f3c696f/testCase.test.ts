import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acotangent', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});