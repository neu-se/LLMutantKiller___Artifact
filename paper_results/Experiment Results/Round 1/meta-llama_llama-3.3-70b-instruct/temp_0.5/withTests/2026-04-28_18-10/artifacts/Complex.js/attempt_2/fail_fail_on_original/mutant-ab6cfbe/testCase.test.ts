import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate the log of a complex number correctly', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.log()).toThrowError();

    const complex2 = new Complex(-1, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(Math.PI);

    const complex3 = new Complex(1, 0);
    const result3 = complex3.log();
    expect(result3.re).toBeCloseTo(0);
    expect(result3.im).toBeCloseTo(0);
  });
});