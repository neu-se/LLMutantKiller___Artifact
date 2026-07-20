import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const z = new Complex(1, 1);
    const result = z.acsc();
    expect(result.re).toBeCloseTo(0.45227844715119064, 5);
    expect(result.im).toBeCloseTo(-0.8813735870195429, 5);
  });
});