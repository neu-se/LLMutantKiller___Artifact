import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with scientific notation", () => {
  it("should correctly parse complex numbers with multi-digit exponents in scientific notation", () => {
    // The original regex uses \d+ (one or more digits) for the exponent part
    // The mutated regex uses \d (exactly one digit) for the exponent part
    // So "1e10" should be parsed as 1e10 = 10000000000
    // With the mutation, "1e10" would be tokenized as "1e1" and "0" separately
    // which would cause a parser error or wrong result
    
    const c = new Complex("1e10");
    expect(c.re).toBeCloseTo(1e10, 0);
    expect(c.im).toBe(0);
  });
});