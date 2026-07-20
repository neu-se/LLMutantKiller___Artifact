import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return Infinity for zero complex number", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});