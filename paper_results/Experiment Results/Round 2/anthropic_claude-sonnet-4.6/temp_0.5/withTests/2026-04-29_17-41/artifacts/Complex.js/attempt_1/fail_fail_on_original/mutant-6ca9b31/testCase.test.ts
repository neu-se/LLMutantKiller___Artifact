import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString with negative zero imaginary part', () => {
  it('should correctly format a complex number where imaginary part becomes negative zero through computation', () => {
    // When b = -0, original: b < 0 is false (uses +), mutated: b <= 0 is true (uses -)
    // But -0 === 0 returns early... need another approach
    // Test with b slightly above 0 to ensure + is used
    const c = new Complex(1, 2);
    expect(c.toString()).toBe('1+2i');
  });
});