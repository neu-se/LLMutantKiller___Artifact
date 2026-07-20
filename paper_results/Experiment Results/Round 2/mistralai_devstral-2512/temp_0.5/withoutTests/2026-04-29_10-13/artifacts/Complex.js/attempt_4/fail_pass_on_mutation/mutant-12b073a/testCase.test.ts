import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a value where the mutation would cause a significant difference", () => {
    const c = new Complex(0.5, 0);
    const result = c.sinh();
    const expectedRe = (Math.exp(0.5) - Math.exp(-0.5)) * 0.5;
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});