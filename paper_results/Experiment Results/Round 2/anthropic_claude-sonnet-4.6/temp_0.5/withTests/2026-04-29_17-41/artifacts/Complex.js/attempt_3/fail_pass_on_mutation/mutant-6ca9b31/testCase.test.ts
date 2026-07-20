import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format 1+0i correctly when imaginary part is positive zero', () => {
    // Create a complex number where re=1, im=+0 (positive zero)
    // b=0 causes early return "1", but with -0 behavior might differ
    const c = new Complex(1, 0);
    expect(c.toString()).toBe('1');
  });
});