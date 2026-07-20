import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers less than -1', () => {
    const complex = new Complex(-2, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
  });
});