import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh zero case", () => {
  it("sinh(0+0i) should return exactly zero", () => {
    // If mutation changes if(a===0&&b===0) to if(true) inside sinh,
    // then sinh of any number returns the zero-case result
    // We test that sinh(1+0i) != sinh(0+0i) to detect the mutation
    const sinhZero = new Complex(0, 0).sinh();
    const sinhOne = new Complex(1, 0).sinh();
    
    // These should be different values
    // sinh(0) = 0, sinh(1) ≈ 1.1752
    expect(sinhOne.re).not.toBeCloseTo(sinhZero.re, 5);
  });
});