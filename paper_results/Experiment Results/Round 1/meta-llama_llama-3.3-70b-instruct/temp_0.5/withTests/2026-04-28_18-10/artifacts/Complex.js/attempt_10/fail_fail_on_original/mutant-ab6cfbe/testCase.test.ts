import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the log of a complex number correctly', () => {
    const complex = new Complex(0, 0);
    expect(complex.log().re).toBeCloseTo(-Infinity);
    expect(complex.log().im).toBeCloseTo(0);

    const complex2 = new Complex(-1, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(Math.PI);

    const complex3 = new Complex(0, 1);
    const result3 = complex3.log();
    expect(result3.re).toBeCloseTo(0);
    expect(result3.im).toBeCloseTo(Math.PI / 2);

    const complex4 = new Complex(1, 0);
    const result4 = complex4.log();
    expect(result4.re).toBeCloseTo(0);
    expect(result4.im).toBeCloseTo(0);
  });
});