import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should compute log(0) correctly, returning -Infinity real part", () => {
    const result = new Complex(0, 0).log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});