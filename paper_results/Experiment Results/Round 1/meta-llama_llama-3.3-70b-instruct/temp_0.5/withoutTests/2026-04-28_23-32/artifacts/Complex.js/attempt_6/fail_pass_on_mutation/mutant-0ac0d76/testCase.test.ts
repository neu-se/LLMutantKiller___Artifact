import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the natural log correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(-1, 0);
    const result2 = complex2.log();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
  });
});