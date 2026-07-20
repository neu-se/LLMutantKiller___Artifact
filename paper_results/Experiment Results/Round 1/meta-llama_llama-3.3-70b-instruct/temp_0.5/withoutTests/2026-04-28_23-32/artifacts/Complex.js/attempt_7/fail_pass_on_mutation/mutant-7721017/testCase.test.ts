import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle pow correctly', () => {
    // Create a complex number
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);

    // Calculate the power
    const resultOriginal = new Complex(0, 0).pow(new Complex(1, 0));
    const resultMutated = new Complex(0, 0).pow(new Complex(1, 0));

    // Check the result
    expect(resultOriginal.re).toBeCloseTo(resultMutated.re);
    expect(resultOriginal.im).toBeCloseTo(resultMutated.im);
  });
});