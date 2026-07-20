import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers greater than 1 with correct sign', () => {
    const complex = new Complex(-2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});