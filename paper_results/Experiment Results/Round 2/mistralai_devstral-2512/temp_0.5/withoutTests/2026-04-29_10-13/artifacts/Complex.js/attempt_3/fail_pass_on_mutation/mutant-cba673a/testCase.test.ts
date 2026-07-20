import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should correctly compute cosh for small non-zero values", () => {
    const c = new Complex(0.000001, 0);
    const result = c.cosh();
    expect(result.re).toBeCloseTo(1.0000000000005, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});