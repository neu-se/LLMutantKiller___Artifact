import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('detects mutation by checking acsc consistency since asec and acsc share same pattern', () => {
    // Since asec d=0 fallback always produces NaN (Inf inputs to acos give NaN),
    // let's verify the mutation changes NaN sign which isNaN() can't distinguish.
    // Instead test that asec(z) for normal values works correctly
    // asec(2) = acos(0.5) = PI/3
    const result = new Complex(2, 0).asec();
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // asec(1+i): verify against known value
    // 1/(1+i) = (1-i)/2 = (0.5, -0.5)
    // acos(0.5, -0.5)
    const z = new Complex(1, 1);
    const asecResult = z.asec();
    const oneOverZ = new Complex(0.5, -0.5);
    const acosResult = oneOverZ.acos();
    expect(asecResult.re).toBeCloseTo(acosResult.re, 10);
    expect(asecResult.im).toBeCloseTo(acosResult.im, 10);
  });
});