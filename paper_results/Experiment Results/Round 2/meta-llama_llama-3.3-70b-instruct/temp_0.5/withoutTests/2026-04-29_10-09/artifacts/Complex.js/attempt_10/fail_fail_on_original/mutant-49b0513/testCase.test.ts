import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const temp = result.re;
    expect(temp).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(1, 1);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
  });
});