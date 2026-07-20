import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute the arc cosecant for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    // The mutation changes division to multiplication in the acsc method
    // This test verifies the correct behavior by checking specific components
    expect(result.re).toBeCloseTo(0.666, 3);
    expect(result.im).toBeCloseTo(-0.666, 3);
  });
});