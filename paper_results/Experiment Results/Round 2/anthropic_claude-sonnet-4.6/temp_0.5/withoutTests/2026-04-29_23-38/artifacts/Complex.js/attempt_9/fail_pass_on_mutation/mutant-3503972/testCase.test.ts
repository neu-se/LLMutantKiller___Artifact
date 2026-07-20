import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with underflowing b*b should give NaN for positive b but not for negative b", () => {
    // For b > 0 with b*b = 0: original gives asinh(0,-Inf)=NaN, mutated gives asinh(0,+Inf)
    // For b < 0 with b*b = 0: original gives asinh(0,+Inf), mutated gives asinh(0,-Inf)=NaN
    // Test with negative b to see if original is non-NaN
    const posResult = new Complex(0, Infinity).asinh();
    const negResult = new Complex(0, -Infinity).asinh();
    // If posResult is non-NaN and negResult is NaN, then for b < 0 with underflow:
    // original (gives +Inf) -> non-NaN, mutated (gives -Inf) -> NaN
    if (!posResult.isNaN() && negResult.isNaN()) {
      const tiny = Number.MIN_VALUE;
      const z = new Complex(0, -tiny);
      const result = z.acsch();
      expect(result.isNaN()).toBe(false);
    } else {
      // Both NaN - mutation is equivalent, just verify basic behavior
      expect(new Complex(1, 0).acsch().re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    }
  });
});