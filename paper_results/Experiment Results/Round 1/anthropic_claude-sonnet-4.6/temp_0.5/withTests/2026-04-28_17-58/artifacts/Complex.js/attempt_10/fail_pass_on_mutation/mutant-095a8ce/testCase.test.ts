import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh", () => {
  it("should correctly compute sinh for a real number", () => {
    const result = new Complex(1, 0).sinh();
    expect(result.re).toBeCloseTo(Math.sinh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});