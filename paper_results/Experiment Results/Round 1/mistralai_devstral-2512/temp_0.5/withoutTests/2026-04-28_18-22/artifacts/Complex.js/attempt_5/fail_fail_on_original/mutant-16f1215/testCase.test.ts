import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly handle division by zero for non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.3375704295731512);
    expect(result.im).toBeCloseTo(-0.3375704295731512);
  });
});