import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly for a specific case", () => {
    const complex = new Complex(-1, -1);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(0.8813735870195429);
    expect(result.im).toBeCloseTo(-2.0943951023931953);
  });
});