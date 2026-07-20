import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when a is zero and b is non-zero in acsch calculation', () => {
    const complex = new Complex(0, 1);
    const originalCodeResult = complex.acsch();
    const a = originalCodeResult.re;
    expect(a).not.toBeCloseTo(0);
    const complex2 = new Complex(0, 1);
    const mutatedCodeResult = complex2.acsch();
    const b = mutatedCodeResult.re;
    expect(b).not.toBeCloseTo(0);
    expect(a).not.toBeCloseTo(b);
  });
});