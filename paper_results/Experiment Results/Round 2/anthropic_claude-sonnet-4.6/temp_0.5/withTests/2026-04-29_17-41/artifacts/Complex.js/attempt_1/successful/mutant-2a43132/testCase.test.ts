import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec method", () => {
  it("should correctly compute asec for a complex number with non-zero d (a^2 - b^2 != 0)", () => {
    // For asec, d = a*a - b*b
    // The mutation changes `return (d !== 0)` to `return (false)`
    // This means the mutated code always takes the else branch
    // We need a case where d !== 0 to expose the difference

    // Use a real number like 2 (a=2, b=0), so d = 4 - 0 = 4 != 0
    // Original: takes the (a/d, -b/d).acos() branch = (2/4, 0/4).acos() = (0.5, 0).acos()
    // Mutated: takes the else branch with (a !== 0) ? a/0 : 0 = Infinity, which gives Infinity.acos()

    const c = new Complex(2, 0);
    const result = c.asec();

    // asec(2) = acos(1/2) = pi/3 ≈ 1.0471975511965976
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});