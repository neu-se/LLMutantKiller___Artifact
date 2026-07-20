import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle pow correctly', () => {
    // Create a complex number
    const c = new Complex(0, 0);
    const z = new Complex(1, 1);

    // Calculate the power
    const result = c.pow(z);

    // Check the result
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});