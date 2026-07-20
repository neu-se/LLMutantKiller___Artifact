import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should return ZERO when dividing a finite complex number by infinity", () => {
    const finite = new Complex(3, 4);
    const infinite = Complex.INFINITY;
    const result = finite.div(infinite);
    
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});