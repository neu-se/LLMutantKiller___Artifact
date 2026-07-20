import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function mutation', () => {
  it('should correctly calculate magnitude for large values', () => {
    const c = new Complex(10000, 20000);
    const magnitude = c.abs();
    expect(magnitude).toBeCloseTo(22360.679775, 5);
  });
});