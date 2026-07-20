import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse array input', () => {
    const c = new Complex([3, 4] as any);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});