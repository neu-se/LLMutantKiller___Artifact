import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch correctly when d underflows to zero with non-zero imaginary part", () => {
    // When a=0 and b=Number.MIN_VALUE, d = b*b underflows to 0
    // Original: (b !== 0) ? -b / 0 : 0 => -Infinity (im part)
    // Mutated:  (b !== 0) ? +b / 0 : 0 => +Infinity (im part)
    const z = new Complex(0, Number.MIN_VALUE);
    const result = z.acsch();
    // Original produces -Infinity imaginary part going into asinh
    // Mutated produces +Infinity imaginary part going into asinh
    // asinh of (0, -Inf) vs asinh of (0, +Inf) differ in sign of imaginary part
    expect(result.im).toBeLessThan(0);
  });
});