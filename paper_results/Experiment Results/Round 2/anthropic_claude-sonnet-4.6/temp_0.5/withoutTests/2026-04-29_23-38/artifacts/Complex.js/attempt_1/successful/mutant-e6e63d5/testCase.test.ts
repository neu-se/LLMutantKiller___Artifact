import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should return the correct arc cosecant of a real complex number", () => {
    // acsc(2) = asin(1/2) = π/6
    const result = new Complex(2, 0).acsc();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});