import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the complex arcus cosecans for a specific complex number with zero real part', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.im).not.toBeCloseTo(0);
  });
});