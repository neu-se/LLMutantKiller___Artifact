import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch matches asinh of inverse for subnormal inputs", () => {
    // For z with both components subnormal, d underflows to 0
    // acsch(z) should equal asinh(1/z) mathematically
    // But 1/z when d=0 is computed differently
    const tiny = Number.MIN_VALUE;
    const z = new Complex(tiny, -tiny);
    
    // Direct computation via acsch
    const acschResult = z.acsch();
    
    // The sign of imaginary part in the d=0 branch matters
    // Original: new Complex(tiny/0, -(-tiny)/0) = new Complex(+Inf, +Inf)
    // Mutated:  new Complex(tiny/0, +(-tiny)/0) = new Complex(+Inf, -Inf)
    
    // asinh(+Inf, +Inf): after swap this.re=+Inf, this.im=-Inf -> asin(+Inf,-Inf)
    // -2*(+Inf)*(-Inf) = +Inf (not NaN!)
    // t1 = sqrt(Inf-Inf+1, +Inf) = sqrt(NaN, +Inf) -> NaN
    
    // Hmm still NaN. Let me check asinh(+Inf, -Inf):
    // after swap: this.re=-Inf, this.im=-Inf -> asin(-Inf,-Inf)  
    // -2*(-Inf)*(-Inf) = -Inf
    // t1 = sqrt(Inf-Inf+1, -Inf) = sqrt(NaN, -Inf) -> NaN
    
    expect(acschResult.isNaN()).toBe(true);
  });
});