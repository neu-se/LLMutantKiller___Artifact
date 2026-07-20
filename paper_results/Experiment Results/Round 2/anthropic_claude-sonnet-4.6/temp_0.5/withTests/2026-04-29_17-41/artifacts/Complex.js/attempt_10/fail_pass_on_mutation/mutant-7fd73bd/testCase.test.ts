import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sqrt mutation detection", () => {
  it("sqrt of negative real number should have zero real part", () => {
    // sqrt(-4) = 2i
    const result = new Complex(-4, 0).sqrt();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(2, 10);
  });
});