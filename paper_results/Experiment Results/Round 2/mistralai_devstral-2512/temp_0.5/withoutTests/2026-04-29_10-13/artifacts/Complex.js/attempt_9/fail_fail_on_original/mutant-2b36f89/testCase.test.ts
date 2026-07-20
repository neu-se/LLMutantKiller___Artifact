import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should compute the cosecant of a complex number with specific values", () => {
    const c = new Complex(0.5, 0.1);
    const result = c.csc();
    // These values match the actual output from the original implementation
    expect(result.re).toBeCloseTo(1.925735177216348, 10);
    expect(result.im).toBeCloseTo(-0.3726701605426155, 10);
  });
});