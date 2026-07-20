import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the log of a complex number correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);

    const complex2 = new Complex(0, 0);
    expect(complex2.log().re).toBeCloseTo(-Infinity);
    expect(complex2.log().im).toBeCloseTo(0);

    const complex3 = new Complex(-1, 0);
    const result3 = complex3.log();
    expect(result3.re).toBeCloseTo(0);
    expect(result3.im).toBeCloseTo(Math.PI);
  });
});