import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex sech', () => {
    const z = new Complex(1, 1);
    const result = z.sech();
    const originalIm = -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2));
    const mutatedIm = -2 / Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2));
    expect(result.im).toBeCloseTo(originalIm, 10);
    expect(result.im).not.toBeCloseTo(mutatedIm, 10);
  });
});