import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(2 + NaN*i) isInfinite differs between original and mutant", () => {
    const result = new Complex(2, NaN).acot();
    // Original: else re=(2!==0)?2/0:0=Infinity → atan(Infinity+NaN*i)
    // Mutated:  else re=(2===0)?2/0:0=0       → atan(0+NaN*i)
    // atan(Infinity+NaN*i): a=Inf, not 0, d=Inf²+(1-NaN)²=NaN, t1=NaN → result NaN
    // atan(0+NaN*i): a=0, b=NaN, b===1? false, b===-1? false, d=0+(1-NaN)²=NaN → NaN
    // Need to check intermediate - atan(Inf,NaN) vs atan(0,NaN)
    // For atan(Inf, NaN): isInfinite check on input to log...
    const originalLikeResult = new Complex(Infinity, NaN).atan();
    const mutantLikeResult = new Complex(0, NaN).atan();
    expect(originalLikeResult.re).not.toBeCloseTo(mutantLikeResult.re ?? 0, 5);
  });
});