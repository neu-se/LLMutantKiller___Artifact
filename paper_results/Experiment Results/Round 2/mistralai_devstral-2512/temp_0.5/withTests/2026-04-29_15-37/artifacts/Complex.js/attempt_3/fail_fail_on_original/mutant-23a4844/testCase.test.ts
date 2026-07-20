import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle the case where a = 2 and b = 0", () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});