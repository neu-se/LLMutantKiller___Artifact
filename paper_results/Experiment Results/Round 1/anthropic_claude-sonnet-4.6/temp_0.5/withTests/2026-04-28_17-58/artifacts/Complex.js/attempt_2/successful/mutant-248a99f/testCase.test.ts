import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div - dividing by infinite complex number", () => {
  it("should return ZERO when dividing a finite non-zero complex number by infinity", () => {
    // Original: if (this['isZero']() || z['isInfinite']()) return Complex['ZERO']
    // Mutated: if (false) — skips the check, so dividing by Infinity won't return ZERO
    const finite = new Complex(3, 4);
    const infinite = Complex.INFINITY;
    const result = finite.div(infinite);

    // In the original code, finite / Infinity = ZERO
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});