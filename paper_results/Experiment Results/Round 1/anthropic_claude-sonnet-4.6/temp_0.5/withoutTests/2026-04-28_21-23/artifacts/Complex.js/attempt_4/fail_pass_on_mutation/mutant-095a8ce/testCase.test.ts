import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return real part PI/2 when called on Complex(0, 0)", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    
    // Original returns Complex(PI/2, Infinity) - re is PI/2
    // Mutated returns Complex(0, 0) - re is 0
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});