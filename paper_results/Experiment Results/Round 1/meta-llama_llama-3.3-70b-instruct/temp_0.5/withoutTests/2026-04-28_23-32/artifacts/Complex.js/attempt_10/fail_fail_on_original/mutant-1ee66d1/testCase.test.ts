import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const z = new Complex(1, 1);
    const result = z.acsc();
    const expectedRe = 0.45227844715119064;
    const expectedIm = -0.8813735870195429;
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-5);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-5);
  });
});