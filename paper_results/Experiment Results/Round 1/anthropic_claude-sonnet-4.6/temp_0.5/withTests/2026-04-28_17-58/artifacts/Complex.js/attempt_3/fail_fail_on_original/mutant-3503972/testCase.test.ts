import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch correctly when both re and im underflow causing d to be zero", () => {
    // a = Number.MIN_VALUE, b = Number.MIN_VALUE => d = a*a + b*b = 0 (underflow)
    // Original: new Complex(a/0, -b/0).asinh() = new Complex(Infinity, -Infinity).asinh()
    // Mutated:  new Complex(a/0, +b/0).asinh() = new Complex(Infinity, +Infinity).asinh()
    const z = new Complex(Number.MIN_VALUE, Number.MIN_VALUE);
    const result = z.acsch();
    const resultMutated = new Complex(Infinity, Infinity).asinh();
    const resultOriginal = new Complex(Infinity, -Infinity).asinh();
    // The results should differ between original and mutated
    expect(result.re).toBeCloseTo(resultOriginal.re, 10);
    expect(result.im).toBeCloseTo(resultOriginal.im, 10);
  });
});