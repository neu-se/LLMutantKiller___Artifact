import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should return correct result when real part is -1 and imaginary part is 0", () => {
    const c = new Complex(-1, 0);
    const result = c.atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});