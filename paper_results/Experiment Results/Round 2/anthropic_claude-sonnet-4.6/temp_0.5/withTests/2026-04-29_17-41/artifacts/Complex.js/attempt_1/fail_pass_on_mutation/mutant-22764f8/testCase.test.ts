import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec function', () => {
  it('should correctly compute asec(2) returning approximately pi/3 with zero imaginary part', () => {
    // asec(2) = acos(1/2) = π/3 ≈ 1.0471975511965976
    // In the mutated code, this['re'] becomes this[""] = undefined
    // causing a = undefined, d = NaN, and the result to be NaN
    const c = new Complex(2, 0);
    const result = c.asec();
    
    const expectedRe = Math.acos(0.5); // π/3
    const expectedIm = 0;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});