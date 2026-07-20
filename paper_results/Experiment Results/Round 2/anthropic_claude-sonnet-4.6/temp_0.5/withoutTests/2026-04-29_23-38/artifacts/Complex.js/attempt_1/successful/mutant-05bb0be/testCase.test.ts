import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a real number", () => {
    // atanh(0.5) should be approximately 0.5493061443340548
    const result = new Complex(0.5, 0).atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});