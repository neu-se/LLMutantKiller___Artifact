import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly multiply two complex numbers', () => {
    const z1 = new Complex(1, 2);
    const z2 = new Complex(3, 0);
    const result = z1.mul(z2);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(6);
  });
});