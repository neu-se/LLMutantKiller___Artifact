import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() large values hypot branch", () => {
  it("should return 5000 for complex number 3000+4000i using the correct hypot calculation", () => {
    const c = new Complex(3000, 4000);
    const absValue = c.abs();
    // 3000 + 4000i has magnitude 5000 (Pythagorean triple scaled by 1000)
    // The mutated code uses y*x instead of y/x in hypot, producing a wildly incorrect result
    expect(absValue).toBe(5000);
  });
});