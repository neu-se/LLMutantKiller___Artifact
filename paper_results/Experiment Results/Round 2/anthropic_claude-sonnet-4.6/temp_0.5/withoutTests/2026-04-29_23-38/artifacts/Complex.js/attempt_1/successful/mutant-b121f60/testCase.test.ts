import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with scientific notation", () => {
  it("should correctly parse complex numbers with multi-digit exponents in scientific notation", () => {
    // The original regex uses \d+ for exponent digits, allowing multi-digit exponents
    // The mutated regex uses \d, only allowing single-digit exponents
    // For '1e10', the original matches '1e10' as one token
    // The mutated version matches '1e1' and then '0' separately, causing a parse error
    
    const c = new Complex('1e10');
    expect(c.re).toBeCloseTo(1e10, 0);
    expect(c.im).toBe(0);
  });
});