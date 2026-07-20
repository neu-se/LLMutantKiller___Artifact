import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part of atanh for a specific complex number", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});