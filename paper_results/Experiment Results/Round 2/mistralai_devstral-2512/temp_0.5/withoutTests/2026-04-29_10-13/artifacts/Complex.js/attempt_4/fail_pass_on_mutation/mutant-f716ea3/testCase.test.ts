import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should return correct result for atanh(-1, 0)", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});