import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format 0+0i correctly showing only real part', () => {
    const c = new Complex(0, 0);
    expect(c.toString()).toBe('0');
    expect(c.toString()).not.toContain('i');
    expect(c.toString()).not.toContain('-');
  });
});