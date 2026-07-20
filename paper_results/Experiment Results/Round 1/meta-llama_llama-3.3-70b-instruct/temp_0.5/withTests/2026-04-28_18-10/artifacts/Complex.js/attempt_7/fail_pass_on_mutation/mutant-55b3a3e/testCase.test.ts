import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the complex arcus cosecans for a specific complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(Math.PI / 2);
  });
});