import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse", () => {
  it("should return a complex number even when only one component is NaN", () => {
    // If return z is INSIDE the if block, then:
    // Original (||): returns z when EITHER is NaN
    // Mutated (&&): only returns z when BOTH are NaN; when only one is NaN, falls through and may error
    const result = new Complex({ re: NaN, im: 5 });
    expect(result.re).toBeNaN();
    expect(result.im).toBe(5);
  });
});