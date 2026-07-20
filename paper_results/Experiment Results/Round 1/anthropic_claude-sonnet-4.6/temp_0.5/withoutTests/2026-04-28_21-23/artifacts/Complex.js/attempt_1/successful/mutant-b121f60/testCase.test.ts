import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with scientific notation", () => {
  it("should correctly parse a complex number string with multi-digit exponent in scientific notation", () => {
    // The mutation changes \d+ to \d in the exponent part of the scientific notation regex
    // Original regex: /\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g
    // Mutated regex:  /\d+\.?\d*e[+-]?\d|\d+\.?\d*|\.\d+|./g
    // With the mutation, "1e10" would only match "1e1" as a scientific notation token,
    // leaving "0" as a separate token, causing incorrect parsing
    
    const c = new Complex("1e10");
    
    // 1e10 = 10000000000
    expect(c.re).toBe(1e10);
    expect(c.im).toBe(0);
  });
});