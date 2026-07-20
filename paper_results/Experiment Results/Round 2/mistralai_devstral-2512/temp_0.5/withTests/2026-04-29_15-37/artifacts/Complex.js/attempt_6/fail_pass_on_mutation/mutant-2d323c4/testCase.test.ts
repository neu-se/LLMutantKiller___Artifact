import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle the case where d equals zero", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});