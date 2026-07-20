import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly compute cosh for small values", () => {
    const c = new Complex(0.5, 0);
    const result = c.cosh();
    expect(result.re).toBeCloseTo(1.1276259652063807);
    expect(result.im).toBeCloseTo(0);
  });
});