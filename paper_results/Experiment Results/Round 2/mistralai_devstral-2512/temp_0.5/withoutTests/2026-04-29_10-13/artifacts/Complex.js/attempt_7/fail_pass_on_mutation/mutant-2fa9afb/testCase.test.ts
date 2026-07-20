import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should compute sinh correctly for non-zero inputs", () => {
    const result = new Complex(1, 1).sinh();
    expect(result.re).toBeCloseTo(0.634964, 6);
    expect(result.im).toBeCloseTo(1.298458, 6);
  });
});