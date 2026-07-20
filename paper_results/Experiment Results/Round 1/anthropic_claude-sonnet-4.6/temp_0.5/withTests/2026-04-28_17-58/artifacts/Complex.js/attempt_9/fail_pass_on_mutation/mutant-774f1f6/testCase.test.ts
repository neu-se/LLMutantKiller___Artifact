import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should compute abs correctly for number exactly at 3000 boundary', () => {
    const c = new Complex(0, 3000);
    // hypot(0, 3000): a=0, b=3000, both < 3000 is false for b
    // so goes to the else branch
    const absVal = c.abs();
    expect(absVal).toBe(3000);
  });
});