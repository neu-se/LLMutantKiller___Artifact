import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should correctly compute log for positive real numbers", () => {
    const c = new Complex(2, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBe(0);
  });
});