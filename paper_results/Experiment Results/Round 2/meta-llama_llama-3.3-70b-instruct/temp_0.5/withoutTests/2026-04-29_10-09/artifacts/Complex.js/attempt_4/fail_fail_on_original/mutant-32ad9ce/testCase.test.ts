import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle NaN values', () => {
    const complex1 = new Complex(NaN, NaN);
    expect(complex1.re).toBeNaN();
    expect(complex1.im).toBeNaN();

    const complex2 = new Complex(NaN, 1);
    expect(complex2.re).toBeNaN();
    expect(complex2.im).toBe(1);

    const complex3 = new Complex(1, NaN);
    expect(complex3.re).toBe(1);
    expect(complex3.im).toBeNaN();
  });
});