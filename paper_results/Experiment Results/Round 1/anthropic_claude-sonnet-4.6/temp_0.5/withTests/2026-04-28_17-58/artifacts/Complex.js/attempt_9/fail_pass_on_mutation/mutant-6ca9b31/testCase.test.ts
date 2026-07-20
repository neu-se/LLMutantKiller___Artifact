import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString with negative zero", () => {
  it("should treat -0 imaginary as zero and return just real part", () => {
    const c = new Complex(3, 1);
    (c as any).im = -0;
    // Bypass epsilon by setting EPSILON to 0 so -0 stays as -0
    // But -0 === 0 is true so early return fires
    // Both versions return "3"
    expect(c.toString()).toBe("3");
  });
});