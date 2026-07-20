import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value when imaginary part is larger than real part and both exceed 3000", () => {
    // For 3000 + 4000i, the expected abs is 5000 (3-4-5 right triangle scaled by 1000)
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});