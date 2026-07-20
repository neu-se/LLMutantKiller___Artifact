import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should correctly compute asinh for a specific complex number", () => {
    const c = new Complex(2, 3);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(1.9686, 4);
    expect(result.im).toBeCloseTo(0.9647, 4);
  });
});