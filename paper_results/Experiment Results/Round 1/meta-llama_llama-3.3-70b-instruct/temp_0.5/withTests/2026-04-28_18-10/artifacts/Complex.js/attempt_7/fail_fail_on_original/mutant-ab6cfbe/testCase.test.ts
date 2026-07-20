import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the log of a complex number correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);

    const complex2 = new Complex(-1, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(Math.PI);

    const complex3 = new Complex(0, 1);
    const result3 = complex3.log();
    expect(result3.re).toBeCloseTo(0);
    expect(result3.im).toBeCloseTo(Math.PI / 2);

    const complex4 = new Complex(0, 0);
    expect(complex4.log().re).toBeCloseTo(-Infinity);
    expect(complex4.log().im).toBeCloseTo(0);

    const complex5 = new Complex(1, 0);
    const result5 = complex5.log();
    expect(result5.re).toBeCloseTo(0);
    expect(result5.im).toBeCloseTo(0);
  });
});