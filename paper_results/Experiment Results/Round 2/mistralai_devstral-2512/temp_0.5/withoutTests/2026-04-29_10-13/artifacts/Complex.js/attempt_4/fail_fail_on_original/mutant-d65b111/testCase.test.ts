import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle complex numbers where b equals 1", () => {
    const c = new Complex(0.5, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.6931471805599453);
    expect(result.im).toBeCloseTo(-1.0038848218538878);
  });
});