import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(0, 1);
    const resultOriginal = complex.asec();
    expect(resultOriginal.re).toBeCloseTo(0);
    expect(resultOriginal.im).toBeCloseTo(-Math.PI / 2);
  });
});