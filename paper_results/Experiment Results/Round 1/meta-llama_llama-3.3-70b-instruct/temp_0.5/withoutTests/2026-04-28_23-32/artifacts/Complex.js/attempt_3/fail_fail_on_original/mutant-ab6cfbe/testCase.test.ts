import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the natural log correctly', () => {
    const complex = new Complex(0, 0);
    expect(complex.log().re).toBeNaN();
    expect(complex.log().im).toBeNaN();

    const complex2 = new Complex(1, 0);
    expect(complex2.log().re).toBeCloseTo(0);
    expect(complex2.log().im).toBeCloseTo(0);

    const complex3 = new Complex(0.5, 0);
    expect(complex3.log().re).toBeCloseTo(Math.log(0.5));
    expect(complex3.log().im).toBeCloseTo(0);

    const complex4 = new Complex(-0.5, 0);
    expect(complex4.log().re).toBeNaN();
    expect(complex4.log().im).toBeNaN();
  });
});