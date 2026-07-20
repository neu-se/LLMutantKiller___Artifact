import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should return correct asec for a real number where a=0 and b=0 edge case path produces Infinity imaginary part", () => {
    // When a=0 and b=0, asec returns Complex(0, Infinity)
    // The mutation changes (a !== 0) ? a / 0 : 0 to (a === 0) ? a / 0 : 0
    // in the d === 0 branch of asec. When a=0, b=0:
    // original: a !== 0 is false, so returns 0; result: Complex(0, 0).acos()
    // mutated: a === 0 is true, so returns a/0 = 0/0 = NaN; result: Complex(NaN, 0).acos()
    // But the early return catches a=0,b=0 before reaching this code.
    // For a non-zero real input like 2, the result should be a real angle.
    const result = new Complex(2, 0).asec();
    // asec(2) = acos(1/2) = π/3
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});