import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should return correct result when real part is -1 and imaginary part is zero", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBeCloseTo(-Infinity, 10);
    expect(result.im).toBe(0);
  });
});