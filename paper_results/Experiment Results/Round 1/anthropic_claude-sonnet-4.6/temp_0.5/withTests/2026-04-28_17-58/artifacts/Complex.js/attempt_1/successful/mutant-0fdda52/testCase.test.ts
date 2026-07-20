import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value when re >= im and both are large", () => {
    // For large values where |re| > |im|, hypot must correctly normalize
    // The mutation changes `if (a < b)` to `if (a >= b)`, which inverts the branch logic
    // When re=4000, im=0: original gives 4000, mutated divides by zero giving NaN
    const c = new Complex(4000, 0);
    const result = c.abs();
    expect(result).toBeCloseTo(4000, 5);
  });
});