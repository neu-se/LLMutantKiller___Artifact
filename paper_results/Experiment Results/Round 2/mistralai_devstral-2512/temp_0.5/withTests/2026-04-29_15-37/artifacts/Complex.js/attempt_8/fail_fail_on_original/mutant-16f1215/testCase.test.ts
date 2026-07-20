import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle complex numbers with specific values that trigger the mutation", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    // The mutation changes the condition from (a !== 0) to (true)
    // This test verifies the correct behavior when a is not zero
    expect(result.re).toBeCloseTo(0.857907604252211);
    expect(result.im).toBeCloseTo(-0.4289538021261055);
  });
});