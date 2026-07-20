import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(2, -1);
    const result2 = complex2.acosh();
    expect(result2.re).toBeCloseTo(1.4436354751788104, 10);
    expect(result2.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});