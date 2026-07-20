import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation detection", () => {
  it("should correctly compute acosh of a complex number", () => {
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    const c = new Complex(2, 0);
    const result = c.acosh();
    
    // The original acosh uses acos internally and should return a valid result
    // The mutated version calls this[""]() which doesn't exist and throws TypeError
    expect(result).toBeDefined();
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");
    expect(isNaN(result.re)).toBe(false);
  });
});