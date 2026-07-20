import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the hypotenuse using the abs function', () => {
    const complex = new Complex(3001, 1);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.hypot(3001, 1));
  });
});