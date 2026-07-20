import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex two-argument parsing', () => {
  it('should create zero complex number when both arguments are null', () => {
    const c = new Complex(null as any, null as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.toString()).toBe('0');
  });
});