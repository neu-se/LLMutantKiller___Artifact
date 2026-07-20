import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle NaN values', () => {
    const complex1 = new Complex({ re: NaN, im: 1 });
    const complex2 = new Complex({ re: 1, im: NaN });
    expect(complex1.re).toBeNaN();
    expect(complex1.im).toBe(1);
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBeNaN();
  });
});