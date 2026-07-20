import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch with NaN real part and non-zero imaginary part correctly", () => {
    // When a = NaN, b = 2: d = NaN*NaN + 4 = NaN
    // d !== 0 is false (NaN !== 0 is true actually...)
    // Wait, NaN !== 0 is TRUE, so d !== 0 branch IS taken
    // Let me reconsider...
    const z = new Complex(NaN, 2);
    const result = z.acsch();
    // With NaN re, result should be NaN
    expect(isNaN(result.re) || isNaN(result.im)).toBe(true);
  });
});