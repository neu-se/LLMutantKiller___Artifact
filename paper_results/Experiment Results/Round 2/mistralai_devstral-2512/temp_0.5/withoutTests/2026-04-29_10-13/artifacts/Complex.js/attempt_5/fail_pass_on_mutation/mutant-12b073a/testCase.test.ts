import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a value where the mutation would cause a significant difference", () => {
    const c = new Complex(2, 0);
    const result = c.sinh();
    const expectedRe = (Math.exp(2) - Math.exp(-2)) * 0.5;
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});