import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atnh", () => {
  it("should correctly compute the imaginary part of atanh for a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0.4438277431771178, 10);
  });
});