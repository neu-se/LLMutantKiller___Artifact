import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinite operands", () => {
  it("should return Infinity when adding an infinite complex number to a finite complex number", () => {
    const infinite = Complex.INFINITY;
    const finite = new Complex(3, 4);
    
    const result = infinite.add(finite);
    
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});