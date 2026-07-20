import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for non-zero input', () => {
    const complex = new Complex(2, 1);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asec();
    expect(result2.re).toBeNaN();
    expect(result2.im).toBeNaN();
  });
});