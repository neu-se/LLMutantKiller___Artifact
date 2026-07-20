import { Complex } from "./complex";

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

    const complex3 = new Complex(0, 0);
    expect(complex3.log().re).toBeCloseTo(-Infinity);
    expect(complex3.log().im).toBeCloseTo(0);

    const complex4 = new Complex(0, 1);
    const result4 = complex4.log();
    expect(result4.re).toBeCloseTo(Math.log(Math.sqrt(1)));
    expect(result4.im).toBeCloseTo(Math.PI / 2);
  });
});