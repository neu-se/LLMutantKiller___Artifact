import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh", () => {
  it("should return a defined result for sinh of a real number", () => {
    // If the mutation breaks the sinh function definition,
    // calling sinh should either throw or return undefined
    const c = new Complex(1, 0);
    const result = c.sinh();
    
    // sinh(1) = sinh(1)*cos(0) + i*cosh(1)*sin(0) = sinh(1) + 0i
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.sinh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});