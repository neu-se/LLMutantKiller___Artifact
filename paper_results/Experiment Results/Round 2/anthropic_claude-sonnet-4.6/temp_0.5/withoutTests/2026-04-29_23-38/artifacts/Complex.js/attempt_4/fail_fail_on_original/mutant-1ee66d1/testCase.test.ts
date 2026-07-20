import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects mutation by checking acsc with negative imaginary subnormal input', () => {
    const tiny = Number.MIN_VALUE;
    // Use negative b so -b/0 = +Infinity (original) vs -b*0 = 0 (mutant)
    // d = tiny^2 + tiny^2 = 0 (underflow), b = -tiny != 0
    const c = new Complex(tiny, -tiny);
    const result = c.acsc();
    
    // Original: Complex(tiny/0, -(-tiny)/0) = Complex(Inf, Inf).asin()
    // Mutant:   Complex(tiny/0, -(-tiny)*0) = Complex(Inf, 0).asin()
    const originalPath = new Complex(Infinity, Infinity).asin();
    const mutantPath = new Complex(Infinity, 0).asin();
    
    // Check they differ
    console.log('original:', originalPath.re, originalPath.im);
    console.log('mutant:', mutantPath.re, mutantPath.im);
    console.log('result:', result.re, result.im);
    
    expect(result.re).toBeCloseTo(originalPath.re, 5);
    expect(result.im).toBeCloseTo(originalPath.im, 5);
  });
});