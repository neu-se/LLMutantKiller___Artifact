import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mutation test", () => {
  it("detects || vs && in NaN check by testing partial NaN object input", () => {
    // With ||: isNaN(NaN) || isNaN(0) = true - enters block  
    // With &&: isNaN(NaN) && isNaN(0) = false - skips block
    // If return z is INSIDE the if block, mutated version won't return z!
    expect(() => {
      const c = new Complex({re: NaN, im: 0});
      return c;
    }).not.toThrow();
  });
});