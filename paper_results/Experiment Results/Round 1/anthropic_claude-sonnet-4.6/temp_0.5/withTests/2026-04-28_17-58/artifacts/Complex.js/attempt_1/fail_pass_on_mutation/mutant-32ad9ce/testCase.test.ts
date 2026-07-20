import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parsing", () => {
  it("should create a complex number when only the real part is NaN", () => {
    // With original code (||): condition is true when re is NaN, but block is empty so z is returned
    // With mutated code (&&): condition is false when only re is NaN, block skipped, z is returned
    // Both should return z, so we verify the object is created correctly
    const c = new Complex({ re: NaN, im: 5 });
    expect(c.re).toBeNaN();
    expect(c.im).toBe(5);
  });
});