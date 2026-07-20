import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth of a non-zero complex number correctly", () => {
    // acoth(2) should not equal new Complex(0, PI/2)
    // With mutation: if(true) always returns Complex(0, PI/2)
    // With original: only returns Complex(0, PI/2) when a===0 && b===0
    const c = new Complex(2, 0);
    const result = c.acoth();
    
    // acoth(2) = atanh(1/2) = 0.5 * log(3) ≈ 0.5493
    expect(result.re).toBeCloseTo(0.5493, 3);
    expect(result.im).toBeCloseTo(0, 10);
  });
});