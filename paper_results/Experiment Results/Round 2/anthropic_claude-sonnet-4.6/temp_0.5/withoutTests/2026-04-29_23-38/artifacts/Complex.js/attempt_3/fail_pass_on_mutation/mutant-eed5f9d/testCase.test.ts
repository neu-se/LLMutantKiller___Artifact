import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("correctly handles tiny complex numbers where d underflows to zero", () => {
    const tiny = 5e-200;
    const result = new Complex(tiny, tiny).acsch();
    // Original: Complex(Infinity, -Infinity).asinh() = NaN
    // Mutant: Complex(0, -Infinity).asinh() = something different
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});