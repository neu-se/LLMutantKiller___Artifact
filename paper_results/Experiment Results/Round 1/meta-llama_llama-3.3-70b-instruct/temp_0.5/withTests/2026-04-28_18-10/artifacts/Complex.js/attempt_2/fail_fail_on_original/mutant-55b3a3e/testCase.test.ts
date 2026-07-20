import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the complex arcus cosecans for non-zero real part', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(Math.PI / 2);
    expect(result.im).toBeCloseTo(0);
  });
});