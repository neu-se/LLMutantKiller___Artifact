import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should compute asec(2) correctly as a real number, not return Infinity", () => {
    const result = new Complex(2, 0).asec();
    // asec(2) = acos(1/2) = π/3 ≈ 1.0471975511965976
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});