import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle case where a^2 - b^2 equals zero", () => {
    const c = new Complex(Math.sqrt(1), Math.sqrt(1));
    const result = c.acsch();
    // This specific case should trigger the d === 0 branch
    // The mutation changes (d !== 0) to (true), which would skip the correct branch
    expect(result.re).toBeCloseTo(0.5306375309525179);
    expect(result.im).toBeCloseTo(-0.45227844715119064);
  });
});