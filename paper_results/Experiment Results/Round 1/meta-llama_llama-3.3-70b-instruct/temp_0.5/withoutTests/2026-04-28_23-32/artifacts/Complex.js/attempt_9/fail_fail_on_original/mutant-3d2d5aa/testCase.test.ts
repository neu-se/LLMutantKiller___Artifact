import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for complex numbers', () => {
    const complex = new Complex(1, 0);
    const result = complex.acoth();
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});