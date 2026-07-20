import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const complex1 = new Complex(2, 0);
    const complex2 = new Complex(3, 0);
    const result = complex1.mul(complex2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });
});