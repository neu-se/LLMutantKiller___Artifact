import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});