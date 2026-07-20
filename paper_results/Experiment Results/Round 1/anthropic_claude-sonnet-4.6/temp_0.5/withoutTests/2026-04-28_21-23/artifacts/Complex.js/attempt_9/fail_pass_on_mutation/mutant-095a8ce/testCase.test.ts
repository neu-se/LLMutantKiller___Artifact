import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0+0i) should not return zero", () => {
    const zero = new Complex(0, 0);
    const result = zero['acsc']();
    // Original: Complex(PI/2, Infinity) - not zero, not finite
    // Mutated: Complex(0,0).asin() = Complex(0,0) - is zero
    expect(result['isZero']()).toBe(false);
  });
});