import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should correctly compute asinh for a purely real number", () => {
    const c = new Complex(1, 0);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0.8814, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});