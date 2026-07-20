import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return correct result for non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.4523, 3);
    expect(result.im).toBeCloseTo(-0.5306, 3);
  });
});