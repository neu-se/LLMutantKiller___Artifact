import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct imaginary part sign for acsc(0,0)", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.im).toBe(Infinity);
    expect(result.im).toBeGreaterThan(0);
  });
});