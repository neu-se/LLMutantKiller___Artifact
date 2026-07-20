import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('asec of purely imaginary number should have specific real part', () => {
    // For Complex(0, b) where b != 0:
    // original: new Complex(0, -Infinity).acos()  
    // mutated:  new Complex(NaN, -Infinity).acos()
    // acos(0, -Inf): t1 = sqrt(Inf, -2*0*(-Inf)=NaN) -> NaN anyway
    // Try Complex(0, 0.5):
    // original: new Complex(0, -0/0=NaN... wait b=0.5 != 0 so -0.5/0 = -Infinity
    // Hmm let me try where b part also matters
    // Actually try input where a=0, b is small so -b/0 = -Infinity
    // Both give new Complex(0 or NaN, -Infinity).acos()
    // Need case where acos distinguishes re=0 vs re=NaN
    
    // Let me try Complex(0, -1): a=0, b=-1
    // original: new Complex(0, -(-1)/0) = new Complex(0, Infinity).acos()
    // mutated:  new Complex(NaN, Infinity).acos()
    const result = new Complex(0, -1).asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
  });
});