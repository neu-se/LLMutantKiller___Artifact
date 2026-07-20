import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should correctly handle edge case where b equals 3000', () => {
    const c = new Complex(0, 3000);
    const absValue = c.abs();
    expect(absValue).toBe(3000);
  });
});