import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot function", () => {
  it("should correctly compute acot(1) = PI/4", () => {
    // acot(1) = atan(1/1) = PI/4
    const c = new Complex(1, 0);
    const result = c.acot();
    
    expect(result).not.toBeUndefined();
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});