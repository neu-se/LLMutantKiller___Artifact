import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec method", () => {
  it("should correctly compute asec for a real number", () => {
    // asec(2) = acos(1/2) = π/3
    const result = new Complex(2, 0).asec();
    const expected = Math.acos(0.5); // π/3 ≈ 1.0471975511965976
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});