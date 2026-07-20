import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch correctly when both components underflow to zero in d calculation", () => {
    // Number.MIN_VALUE * Number.MIN_VALUE underflows to 0
    // So d = 0, but b !== 0
    const tiny = Number.MIN_VALUE; // 5e-324
    const z = new Complex(0, tiny);
    const result = z.acsch();
    // With original: new Complex(0, -tiny/0 = -Infinity).asinh()
    // With mutated:  new Complex(0, +tiny/0 = +Infinity).asinh()
    // asinh(0 - Infinity*i) should have negative imaginary part
    // asinh(0 + Infinity*i) should have positive imaginary part
    expect(result.im).toBeLessThan(0);
  });
});