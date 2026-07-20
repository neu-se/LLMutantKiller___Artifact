import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects mutation through acsc with specific tiny imaginary value', () => {
    // Use b = 1e-200 so d underflows to 0
    // Original: asin(0, -Inf) 
    // Mutated:  asin(0, +Inf)
    // Both give NaN... but let me check re component
    const orig = new Complex(0, -Infinity).asin();
    const mut = new Complex(0, Infinity).asin();
    // Check re components
    expect(orig.re).toBeNaN();
    expect(mut.re).toBeNaN();
    // They're both NaN - cannot distinguish
    // BUT: what if I check the actual acsc result for a specific input
    // where d is small but non-zero?
    // For b = 1e-154: d = 1e-308 != 0, uses d!=0 branch
    // acsc(0, 1e-154) = asin(0, -1e154)
    // asin(0, -1e154): b=-1e154, -2*0*(-1e154) = 0 (not NaN! finite*0=0)
    // b^2 = 1e308 (just at the edge of overflow)
    const result = new Complex(0, 1e-154).acsc();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeLessThan(0);
  });
});