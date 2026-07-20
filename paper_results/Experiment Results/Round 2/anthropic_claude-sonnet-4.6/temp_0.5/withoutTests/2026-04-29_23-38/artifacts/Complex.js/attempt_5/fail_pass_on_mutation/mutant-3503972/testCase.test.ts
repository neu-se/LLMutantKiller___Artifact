import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should return NaN for acsch of subnormal purely imaginary number where d underflows", () => {
    // Verify the underflow actually happens
    const tiny = Number.MIN_VALUE;
    // tiny * tiny should be 0 due to underflow
    // If it is 0, then d=0 but b=tiny != 0, triggering the mutation
    if (tiny * tiny === 0) {
      const z = new Complex(0, tiny);
      const result = z.acsch();
      expect(result.isNaN()).toBe(true);
    } else {
      // Fallback: underflow didn't happen, skip
      expect(true).toBe(true);
    }
  });
});