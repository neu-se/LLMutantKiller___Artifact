import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with scientific notation", () => {
  it("should correctly parse a complex number string with multi-digit scientific notation exponent", () => {
    // The original regex uses \d+ for the exponent part of scientific notation,
    // allowing multi-digit exponents like 1e10, 2.5e-15, etc.
    // The mutated regex uses \d (single digit only), so "1e10" would be parsed incorrectly.
    const c = new Complex("1e10");
    expect(c.re).toBe(1e10);
    expect(c.im).toBe(0);
  });
});