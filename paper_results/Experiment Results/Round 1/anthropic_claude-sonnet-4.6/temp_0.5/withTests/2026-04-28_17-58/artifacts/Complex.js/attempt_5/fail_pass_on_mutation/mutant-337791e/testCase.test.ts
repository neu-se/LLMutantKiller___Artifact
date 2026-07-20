import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp mutation", () => {
  it("sinh uses exp internally and should work correctly for real inputs", () => {
    // sinh(1) = (e - e^-1) / 2
    const result = new Complex(1, 0).sinh();
    const expected = (Math.E - 1/Math.E) / 2;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});