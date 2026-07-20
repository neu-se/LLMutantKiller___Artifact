import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the natural log correctly', () => {
    const complex = new Complex(1, 0);
    expect(complex.log().re).toBeCloseTo(0);
    expect(complex.log().im).toBeCloseTo(0);

    const complex2 = new Complex(0.5, 0);
    expect(complex2.log().re).toBeCloseTo(Math.log(0.5));
    expect(complex2.log().im).toBeCloseTo(0);

    const complex3 = new Complex(-0.5, 0);
    expect(complex3.log().re).toBeNaN();
    expect(complex3.log().im).toBeNaN();
  });
});