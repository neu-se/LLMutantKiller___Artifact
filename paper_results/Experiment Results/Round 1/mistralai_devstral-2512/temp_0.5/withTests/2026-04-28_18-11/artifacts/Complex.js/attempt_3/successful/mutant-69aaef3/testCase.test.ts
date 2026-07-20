import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot function mutation', () => {
  it('should correctly compute hypot when y is zero', () => {
    const c = new Complex(3000, 0);
    const abs = c.abs();
    expect(abs).toBe(3000);
  });
});