import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec of purely imaginary number 2i should have real part equal to PI/2", () => {
    const result = new Complex(0, 2).asec();
    // Original path: new Complex(0, -Infinity).acos() -> PI/2
    // Mutated path: new Complex(NaN, -Infinity).acos() -> NaN
    expect(result.re).toBe(Math.PI / 2);
  });
});