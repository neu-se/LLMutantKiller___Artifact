import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should compute inverse of a non-zero complex number correctly", () => {
    // Test 1/( 2 + 0i) = 0.5 + 0i
    const c = new Complex(2, 0);
    const result = c.inverse();
    expect(result.re).toBeCloseTo(0.5);
    expect(result.im).toBeCloseTo(0);
  });
});