import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for expm1', () => {
    const complex = new Complex(0.1, 0.1);
    const expm1 = complex.expm1();
    expect(expm1.re).toBeCloseTo(0.105171, 5);
    expect(expm1.im).toBeCloseTo(0.105171, 5);
  });
});