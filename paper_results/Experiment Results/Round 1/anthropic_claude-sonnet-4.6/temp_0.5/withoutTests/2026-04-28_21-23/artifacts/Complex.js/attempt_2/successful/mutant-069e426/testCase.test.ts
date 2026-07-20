import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation test', () => {
  it('should correctly compute asec for subnormal input where d underflows to zero with non-zero a', () => {
    // Use a subnormal number: a*a underflows to 0, so d=0, but a !== 0
    // Original: passes (Infinity, 0) to acos → acos(Infinity) 
    // Mutated: passes (0, 0) to acos → acos(0) = PI/2
    const a = Number.MIN_VALUE;
    const b = 0;
    const result = new Complex(a, b).asec();
    // acos of (0,0): t1 = sqrt(0-0+1, 0) = sqrt(1,0) = (1,0)
    // t2 = log(1-0, 0+0) = log(1,0) = (0,0)
    // acos result = (PI/2 - 0, 0) = (PI/2, 0)
    // So mutated gives PI/2, original gives something different
    // Original: acos(Infinity, 0) - isInfinite check triggers NaN path? No...
    // Let's just check: original result should NOT equal PI/2
    const acosOfZero = new Complex(0, 0).acos();
    expect(result.re).not.toBeCloseTo(acosOfZero.re, 10);
  });
});