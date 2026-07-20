import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should produce correct result for tiny complex number where d underflows", () => {
    const tiny = Number.MIN_VALUE;
    const z = new Complex(tiny, tiny);
    const result = z.acsch();
    
    // In original: d=0, a/d=Infinity, -b/d=-Infinity → asinh(Inf, -Inf)
    // In mutated: d=0, a/d=Infinity, im=0 → asinh(Inf, 0)
    // These produce different results
    
    // asinh(Inf, 0): swap→(0,-Inf), asin(0,-Inf)
    // sin(0,-Inf): sin(0)*cosh(-Inf) + i*cos(0)*sinh(-Inf) = 0 + i*(-Inf) = (0,-Inf)
    // t1 = sqrt((-Inf)^2 - 0 + 1, -2*0*(-Inf)) = sqrt(Inf, 0) = (Inf, 0)
    // t2 = log(Inf - (-Inf), 0 + 0) = log(Inf, 0) = (Inf, 0)  
    // asin result: (t2.im, -t2.re) = (0, -Inf)
    // asinh: re=-im=-(-Inf)=Inf... hmm
    
    // Let me just check the imaginary part is not zero in original
    const asinhResult = new Complex(tiny / 0, -tiny / 0).asinh();
    expect(result.re).toBe(asinhResult.re);
    expect(result.im).toBe(asinhResult.im);
  });
});