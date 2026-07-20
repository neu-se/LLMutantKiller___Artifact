import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function mutation', () => {
  it('should correctly calculate magnitude for values triggering the overflow branch', () => {
    // Create values that will trigger the overflow branch in hypot function
    const c = new Complex(4000, 3000);
    const magnitude = c.abs();
    // The correct magnitude should be 5000
    // With mutation (b = y * x instead of b = y / x), this will give wrong result
    expect(magnitude).toBe(5000);
  });
});