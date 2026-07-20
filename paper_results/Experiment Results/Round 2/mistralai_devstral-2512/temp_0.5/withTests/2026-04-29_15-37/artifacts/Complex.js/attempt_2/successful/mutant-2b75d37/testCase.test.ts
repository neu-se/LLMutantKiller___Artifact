import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should compute the arc cotangent of a real number", () => {
    const c = new Complex(1, 0);
    const result = c.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});