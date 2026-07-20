import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex arcus cosecans for a specific case", () => {
    const c = new Complex(0, 1);
    const originalResult = c.acsc();
    const c2 = new Complex(0, 1);
    const mutatedResult = c2.acsc();
    expect(originalResult.re).not.toBeCloseTo(mutatedResult.re, 10);
    expect(originalResult.im).not.toBeCloseTo(mutatedResult.im, 10);
  });
});