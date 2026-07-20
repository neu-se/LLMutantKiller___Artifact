import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should correctly handle division by zero for real part", () => {
    const c = new Complex(0, 1);
    const result = c.acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});