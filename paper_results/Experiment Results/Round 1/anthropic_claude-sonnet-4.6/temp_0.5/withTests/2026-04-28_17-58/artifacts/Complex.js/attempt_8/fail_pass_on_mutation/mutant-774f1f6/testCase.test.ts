import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return 0 for real part when constructed with null', () => {
    const c = new Complex(null as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c[''] as any).toBeUndefined();
  });
});