import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should give NaN re for MIN_VALUE inputs in original but different in mutated', () => {
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, tiny);
    const result = c.acot();
    // Original: atan(+Inf, -Inf) -> check re
    // Mutated: atan(0, -Inf) -> check re  
    // Let's see what atan(0, -Inf).re actually is vs atan(Inf, -Inf).re
    const atanInfMinusInf = new Complex(Infinity, -Infinity).atan();
    expect(isNaN(result.re)).toBe(isNaN(atanInfMinusInf.re));
  });
});