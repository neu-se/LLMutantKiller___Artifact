import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return a finite complex number for asec(1, 0)", () => {
    const result = new Complex(1, 0).asec();
    expect(result.isFinite()).toBe(true);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});