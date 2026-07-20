import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with negative subnormal imaginary part where b*b underflows", () => {
    const b = -1e-200; // b*b = 1e-400 underflows to 0, b < 0
    const z = new Complex(0, b);
    const result = z.acsch();
    // d = 0, b != 0, b < 0
    // Original: new Complex(0, -b/0) = new Complex(0, +Infinity).asinh() -> (Infinity, pi/2) NOT NaN
    // Mutated:  new Complex(0, +b/0) = new Complex(0, -Infinity).asinh() -> NaN
    expect(result.isNaN()).toBe(false);
  });
});