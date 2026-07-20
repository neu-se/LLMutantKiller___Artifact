import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex module loads correctly', () => {
  it('Complex constructor is available and functional', () => {
    const c = new Complex(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
    expect(c.abs()).toBe(5);
  });
});