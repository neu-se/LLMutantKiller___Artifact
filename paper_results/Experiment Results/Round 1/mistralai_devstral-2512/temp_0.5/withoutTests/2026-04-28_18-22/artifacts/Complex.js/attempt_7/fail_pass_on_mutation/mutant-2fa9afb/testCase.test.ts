import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should compute sinh correctly for non-zero real numbers", () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    expect(result.re).toBeCloseTo(Math.sinh(1), 10);
    expect(result.im).toBe(0);
  });
});