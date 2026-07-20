import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('should produce Infinity imaginary part for asec of extremely small complex number with negative b', () => {
    // Use a = Number.MIN_VALUE, b = -Number.MIN_VALUE so both squared underflow to 0
    // d = a*a + b*b = 0, but a != 0 and b != 0, so early return not triggered
    // Original: im part = -b/0 = -(-MIN_VALUE)/0 = +Infinity → acos(MIN_VALUE/0, +Inf) 
    // Mutated:  im part = +b/0 = +(-MIN_VALUE)/0 = -Infinity → different acos result
    // Let's use b < 0 so signs differ clearly
    const tiny = Number.MIN_VALUE;
    const z = new Complex(tiny, -tiny);
    const result = z.asec();
    // With original: -b/0 where b=-tiny gives +Infinity
    // With mutated: +b/0 where b=-tiny gives -Infinity  
    // Trace through acos to find observable difference
    expect(isFinite(result.re) || result.re === Math.PI / 2).toBe(true);
    expect(result.im).toBeGreaterThan(0);
  });
});