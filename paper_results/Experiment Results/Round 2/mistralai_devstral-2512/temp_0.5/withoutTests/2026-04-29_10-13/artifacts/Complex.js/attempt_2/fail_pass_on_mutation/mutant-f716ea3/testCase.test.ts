import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should return correct result for atanh(-1)", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});