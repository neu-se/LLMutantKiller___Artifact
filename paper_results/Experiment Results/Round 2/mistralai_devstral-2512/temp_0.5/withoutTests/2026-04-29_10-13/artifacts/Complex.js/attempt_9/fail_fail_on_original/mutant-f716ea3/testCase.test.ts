import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should return correct result for atanh(-1, 0.5)", () => {
    const result = new Complex(-1, 0.5).atanh();
    expect(result.re).toBeCloseTo(-0.402359478108525);
    expect(result.im).toBeCloseTo(0.553574358897045);
  });
});