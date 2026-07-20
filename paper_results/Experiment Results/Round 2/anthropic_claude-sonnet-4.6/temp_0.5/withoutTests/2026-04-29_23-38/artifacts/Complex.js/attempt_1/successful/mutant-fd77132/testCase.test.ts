import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should compute the complex arcsecant of a real number", () => {
    const result = new Complex(2, 0).asec();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
    // asec(2) = acos(1/2) = PI/3
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});