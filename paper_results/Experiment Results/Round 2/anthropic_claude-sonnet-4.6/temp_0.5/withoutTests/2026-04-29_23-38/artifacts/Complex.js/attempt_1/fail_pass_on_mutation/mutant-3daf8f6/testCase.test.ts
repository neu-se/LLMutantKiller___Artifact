import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary condition', () => {
  it('should compute log correctly when _a equals exactly 3000', () => {
    // When a=3000, b=0: logHypot(3000, 0) is used in log()
    // Original: _a < 3000 is false -> path 2 (divide by 2)
    // Mutated: _a <= 3000 is true -> path 1 (direct)
    const c = new Complex(3000, 0);
    const result = c.log();
    
    const expected = Math.log(3000);
    expect(result.re).toBe(expected);
    expect(result.im).toBeCloseTo(0, 15);
  });
});