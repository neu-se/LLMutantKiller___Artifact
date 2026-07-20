import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should compute the arcsecant of a real number correctly", () => {
    // asec(2) = acos(1/2) = π/3
    const result = new Complex(2, 0).asec();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});