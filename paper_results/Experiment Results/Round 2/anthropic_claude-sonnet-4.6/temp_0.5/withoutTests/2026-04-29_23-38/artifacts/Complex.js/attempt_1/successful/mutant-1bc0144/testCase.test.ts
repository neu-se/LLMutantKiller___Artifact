import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute the inverse secant of a real number", () => {
    // asec(2) = acos(1/2) = π/3
    const result = new Complex(2, 0).asec();
    const expected = Math.PI / 3;
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});