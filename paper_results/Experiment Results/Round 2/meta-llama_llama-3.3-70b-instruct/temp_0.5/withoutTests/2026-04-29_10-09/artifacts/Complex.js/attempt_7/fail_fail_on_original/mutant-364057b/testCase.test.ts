import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0, 1);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBe(Infinity);
    expect(result2.im).toBe(0);
    expect(complex.asech().re).not.toBe(complex2.asech().re);
  });
});