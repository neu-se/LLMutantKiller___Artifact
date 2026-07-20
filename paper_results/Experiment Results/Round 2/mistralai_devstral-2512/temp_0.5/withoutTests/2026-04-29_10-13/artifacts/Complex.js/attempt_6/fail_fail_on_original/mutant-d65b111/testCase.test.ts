import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle complex numbers where a=0 and b=0", () => {
    const c = new Complex(0, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBe(Infinity);
  });
});