import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should handle non-zero inputs correctly", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.14694666622552978);
    expect(result.im).toBeCloseTo(-0.3217505543966422);
  });
});