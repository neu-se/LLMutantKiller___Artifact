import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('should return correct value for zero input where d is 0', () => {
    const c = new Complex(0, 0);
    const result = c.acoth();
    // With original (d !== 0): d=0, takes second branch -> atanh of (0/0, -0/0) = atanh(NaN, NaN) = NaN
    // With mutated (true): takes first branch -> atanh of (0, 0) = 0
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});