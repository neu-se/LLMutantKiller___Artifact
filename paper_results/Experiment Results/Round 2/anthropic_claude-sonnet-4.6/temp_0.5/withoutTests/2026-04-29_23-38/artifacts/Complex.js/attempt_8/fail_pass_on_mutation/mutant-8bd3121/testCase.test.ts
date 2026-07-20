import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should not return NaN for asech(3+4i)", () => {
    const c = new Complex(3, 4);
    const result = c.asech();
    
    // In original: valid computation using im=4
    // In mutant: b=this[""]=undefined, d=NaN, result should be NaN
    expect(result.re).toBe(result.re); // NaN !== NaN, so this fails if NaN
    expect(result.im).toBe(result.im); // NaN !== NaN, so this fails if NaN
  });
});