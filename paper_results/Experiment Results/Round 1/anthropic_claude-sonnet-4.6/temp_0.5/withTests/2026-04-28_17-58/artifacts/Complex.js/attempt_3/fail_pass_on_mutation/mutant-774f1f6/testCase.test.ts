import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex parsing', () => {
  it('should correctly handle undefined input returning zero complex number', () => {
    const c = new Complex(undefined as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});