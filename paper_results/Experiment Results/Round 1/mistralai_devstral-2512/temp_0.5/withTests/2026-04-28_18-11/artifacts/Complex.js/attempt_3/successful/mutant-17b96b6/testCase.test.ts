import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct values for non-zero inputs", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.4023594781362232);
    expect(result.im).toBeCloseTo(-0.5535743588970451);
  });
});