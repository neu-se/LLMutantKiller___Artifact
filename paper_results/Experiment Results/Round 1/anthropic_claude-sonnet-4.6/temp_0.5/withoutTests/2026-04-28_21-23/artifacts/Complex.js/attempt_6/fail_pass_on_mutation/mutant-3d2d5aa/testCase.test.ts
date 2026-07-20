import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('verifies the fallback branch is reachable and detects mutation', () => {
    // Verify subnormal squared is actually 0
    const tiny = 5e-324;
    expect(tiny * tiny).toBe(0); // confirm d would be 0
    
    // Now test acoth - if d=0 branch is taken:
    // Original: Complex(Infinity, 0).atanh() -> NaN
    // Mutant: Complex(0, 0).atanh() -> 0
    const c = new Complex(tiny, 0);
    const result = c.acoth();
    expect(result.re).toBeNaN();
  });
});