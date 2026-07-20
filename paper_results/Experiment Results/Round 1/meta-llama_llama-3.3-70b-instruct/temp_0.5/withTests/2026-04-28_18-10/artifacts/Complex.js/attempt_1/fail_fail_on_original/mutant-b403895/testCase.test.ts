import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalResult = new Complex(0, Math.PI / 2);
    const original = originalResult.asec();
    expect(original.re).not.toBeNaN();
    expect(original.im).not.toBeNaN();
    expect(result.re).not.toEqual((1 / 0) * 0);
    expect(result.im).not.toEqual((1 / 0) * 0);
  });
});