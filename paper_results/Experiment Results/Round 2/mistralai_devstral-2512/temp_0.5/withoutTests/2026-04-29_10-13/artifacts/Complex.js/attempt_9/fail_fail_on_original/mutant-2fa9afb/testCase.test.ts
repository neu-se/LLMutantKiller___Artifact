import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should handle non-zero inputs correctly", () => {
    const result = new Complex(0.5, 0.5).sinh();
    expect(result.re).toBeCloseTo(0.521095, 6);
    expect(result.im).toBeCloseTo(0.549306, 6);
  });
});