import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with opposing infinities", () => {
  it("should return INFINITY when adding two infinite complex numbers where one has negative infinity components", () => {
    // When both are infinite, the first check returns NaN (handled separately)
    // We need: this is infinite, z is NOT infinite, but arithmetic gives NaN
    // this = (-Infinity, 0) -> isInfinite() = true, z = (1, 0) -> isInfinite() = false
    // Original: returns INFINITY; Mutated: returns new Complex(-Infinity + 1, 0 + 0) = new Complex(-Infinity, 0)
    const negInf = new Complex(-Infinity, 0);
    const finite = new Complex(1, 0);
    const result = negInf.add(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity); // Original INFINITY has re = Infinity
  });
});