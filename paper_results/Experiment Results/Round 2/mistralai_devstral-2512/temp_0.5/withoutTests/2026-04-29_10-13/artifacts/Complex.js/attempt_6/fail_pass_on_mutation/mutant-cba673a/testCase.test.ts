import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should correctly compute cosh for complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.cosh();
    expect(result.re).toBeCloseTo(0.8337300251311491, 10);
    expect(result.im).toBeCloseTo(0.9888977057628651, 10);
  });
});