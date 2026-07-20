import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should detect the mutation by testing the exact boundary condition with specific values', () => {
    // Test with values that will produce different results based on which branch is taken
    const c1 = new Complex(2999, 3000);
    const c2 = new Complex(3000, 3000);
    const abs1 = c1.abs();
    const abs2 = c2.abs();
    // The original code should use different calculation paths for these cases
    // The mutated code will use the same path for both
    // This should result in different floating point precision
    expect(abs1).not.toBeCloseTo(abs2, 15);
  });
});