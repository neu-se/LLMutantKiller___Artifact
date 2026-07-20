import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle division correctly when computing acsch for non-zero imaginary component", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.146, 3);
    expect(result.im).toBeCloseTo(-0.231, 3);
  });
});