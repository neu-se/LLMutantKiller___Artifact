import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for non-zero complex numbers and fail for mutated code', () => {
    const complex = new Complex(1, 1);
    const acschOriginal = complex.acsch();
    const complexMutated = new Complex(1, 1);
    const a = complexMutated.re;
    const b = complexMutated.im;
    const d = a / a + b * b;
    const acschMutated = new Complex(
      -Math.log((1 + Math.sqrt(1 + d)) / (1 - Math.sqrt(1 + d))),
      0
    );
    expect(acschOriginal.re).not.toBeCloseTo(acschMutated.re, 3);
    expect(acschOriginal.im).not.toBeCloseTo(acschMutated.im, 3);
  });
});