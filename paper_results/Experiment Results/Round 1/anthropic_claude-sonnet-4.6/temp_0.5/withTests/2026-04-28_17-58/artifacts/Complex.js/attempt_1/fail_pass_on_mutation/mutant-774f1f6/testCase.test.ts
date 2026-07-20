import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse a real number', () => {
    const c = new Complex(5);
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
  });
});