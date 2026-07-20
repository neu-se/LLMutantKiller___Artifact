import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const z = new Complex(0, 1);
    const original = new Complex(0, 1);
    const resultOriginal = original.acsc();
    const result = z.acsc();
    expect(result.re).toBeCloseTo(resultOriginal.re, 5);
    expect(result.im).toBeCloseTo(resultOriginal.im, 5);
  });
});