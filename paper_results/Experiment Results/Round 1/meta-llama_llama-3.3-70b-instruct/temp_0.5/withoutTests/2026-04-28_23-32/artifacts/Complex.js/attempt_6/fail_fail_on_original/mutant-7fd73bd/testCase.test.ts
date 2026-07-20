import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the natural log correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBeCloseTo(0);

    const complex2 = new Complex(-2, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(Math.log(2));
    expect(result2.im).toBeCloseTo(Math.PI);

    const complex3 = new Complex(1, 0);
    const result3 = complex3.log();
    expect(result3.re).toBeCloseTo(0);
    expect(result3.im).toBeCloseTo(0);
  });
});