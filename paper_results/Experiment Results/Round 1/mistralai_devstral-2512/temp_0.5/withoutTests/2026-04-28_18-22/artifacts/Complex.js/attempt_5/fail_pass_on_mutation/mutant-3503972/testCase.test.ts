import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle division by zero correctly for negative imaginary input", () => {
    const c = new Complex(0, -1);
    const result = c.acsch();
    expect(result.im).toBeGreaterThan(0);
  });
});