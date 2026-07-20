import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should return a finite real part for asec of a purely imaginary number", () => {
    // For asec(0 + 2i): a=0, b=2
    // Original else branch: new Complex(0, -Infinity).acos() -> finite result
    // Mutated else branch: new Complex(NaN, -Infinity).acos() -> NaN result
    const result = new Complex(0, 2).asec();
    // The real part should be PI/2 for asec(2i)
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
  });
});