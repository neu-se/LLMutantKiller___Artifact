import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("returns NaN for very small real input where squaring underflows to zero", () => {
    // Number.MIN_VALUE * Number.MIN_VALUE underflows to 0
    // d = 0, a != 0, so original: Complex(Infinity, 0).acos() = NaN
    // mutated: Complex(0, 0).acos() = Complex(PI/2, 0), not NaN
    const result = new Complex(Number.MIN_VALUE, 0).asec();
    expect(result.isNaN()).toBe(true);
  });
});