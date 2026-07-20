import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute acsch when a^2 - b^2 equals zero", () => {
    // Create a complex number where a^2 - b^2 = 0
    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.acsch();

    // The mutation changes the condition from (d !== 0) to (true)
    // This test case specifically targets the branch where d === 0
    // The correct behavior should use the second branch when d === 0
    expect(result.re).toBeCloseTo(0.5306375309525179);
    expect(result.im).toBeCloseTo(-0.45227844715119064);
  });
});