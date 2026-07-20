import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsch', () => {
  it('produces correct acsch result for subnormal inputs where d underflows to zero with nonzero a', () => {
    const tiny = Number.MIN_VALUE; // 5e-324, tiny*tiny = 0 (underflow)
    // b = tiny !== 0, so early return for b===0 is skipped
    // d = tiny^2 + tiny^2 = 0 due to underflow
    // Original: intermediate = Complex((tiny !== 0) ? tiny/0 : 0, (tiny !== 0) ? -tiny/0 : 0)
    //         = Complex(Infinity, -Infinity)
    // Mutated:  intermediate = Complex((false) ? tiny/0 : 0, (tiny !== 0) ? -tiny/0 : 0)
    //         = Complex(0, -Infinity)
    const c = new Complex(tiny, tiny);
    const result = c.acsch();
    
    // Compute what original should give: asinh(Infinity - Infinity*i)
    const originalIntermediate = new Complex(Infinity, -Infinity);
    const expected = originalIntermediate.asinh();
    
    expect(result.re).toBe(expected.re);
    expect(result.im).toBe(expected.im);
  });
});