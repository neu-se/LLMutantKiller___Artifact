import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atan", () => {
  it("should return correct result for atan(0, -1)", () => {
    const result = new Complex(0, -1).atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBe(-Infinity);
  });
});