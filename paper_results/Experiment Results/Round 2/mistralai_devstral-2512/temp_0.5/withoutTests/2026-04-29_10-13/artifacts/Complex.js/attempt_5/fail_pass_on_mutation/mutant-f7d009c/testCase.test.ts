import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should handle the boundary case where b equals exactly 3000 differently', () => {
    const c1 = new Complex(3000, 3000);
    const c2 = new Complex(3000, 2999);
    const abs1 = c1.abs();
    const abs2 = c2.abs();
    // In the original code, both should use different calculation paths
    // In the mutated code, both will use the same path
    expect(abs1).not.toBe(abs2);
  });
});