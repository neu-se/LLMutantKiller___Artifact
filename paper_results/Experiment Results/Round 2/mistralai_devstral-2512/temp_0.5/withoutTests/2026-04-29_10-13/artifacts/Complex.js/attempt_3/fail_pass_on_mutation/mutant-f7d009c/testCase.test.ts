import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should correctly calculate abs for large values where b equals exactly 3000', () => {
    const c = new Complex(2999, 3000);
    const absValue = c.abs();
    // The exact expected value is sqrt(2999^2 + 3000^2)
    const expected = Math.sqrt(2999*2999 + 3000*3000);
    expect(absValue).toBeCloseTo(expected, 10);
  });
});