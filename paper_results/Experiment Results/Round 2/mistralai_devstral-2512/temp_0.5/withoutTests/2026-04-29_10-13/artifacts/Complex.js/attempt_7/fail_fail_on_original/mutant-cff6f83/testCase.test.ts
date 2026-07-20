import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with specific values", () => {
    const c = new Complex(2, 1);
    const result = c.acsch();
    // The mutation changes division to multiplication in the acsch calculation
    // This test verifies the correct mathematical relationship
    expect(result.re).toBeCloseTo(0.2203, 4);
    expect(result.im).toBeCloseTo(-0.4205, 4);
  });
});