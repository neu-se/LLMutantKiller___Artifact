import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot function", () => {
  it("should return the correct arcus cotangent for a real number", () => {
    const c = new Complex(1, 0);
    const result = c.acot();
    
    // acot(1) = atan(1/1) = atan2(1, 1) = π/4
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});