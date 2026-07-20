import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1", () => {
  it("expm1 result should match exp(z).sub(1) for complex input", () => {
    const z = new Complex(0.5, 0.5);
    
    const expm1Result = z.expm1();
    const expMinus1Result = z.exp().sub(1);
    
    expect(expm1Result.re).toBeCloseTo(expMinus1Result.re, 5);
    expect(expm1Result.im).toBeCloseTo(expMinus1Result.im, 5);
  });
});