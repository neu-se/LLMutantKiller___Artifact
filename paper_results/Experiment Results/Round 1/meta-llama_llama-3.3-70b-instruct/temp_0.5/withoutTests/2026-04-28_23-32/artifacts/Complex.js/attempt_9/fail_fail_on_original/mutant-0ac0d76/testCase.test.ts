import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the natural log correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    const complex2 = new Complex(-1, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeNaN();
    const complex3 = new Complex(0, 0);
    const result3 = complex3.log();
    expect(result3.re).toBeNaN();
    const complex4 = new Complex(2, 0);
    const result4 = complex4.log();
    expect(result4.re).toBeCloseTo(Math.log(2));
  });
});