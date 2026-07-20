import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1.5430806348152437);
    expect(result.im).toBeCloseTo(0);
  });
});