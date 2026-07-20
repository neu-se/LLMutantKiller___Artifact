import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should expose the mutation by testing the exact boundary where b equals 3000 with specific values', () => {
    // Create a complex number where b = 3000 and a is small enough to trigger different calculation paths
    const c = new Complex(0.1, 3000);
    const absValue = c.abs();
    // The mutation changes which calculation path is taken when b exactly equals 3000
    // This should produce different floating point results between original and mutated versions
    const expected = Math.sqrt(0.1*0.1 + 3000*3000);
    expect(absValue).toBeCloseTo(expected, 14);
  });
});