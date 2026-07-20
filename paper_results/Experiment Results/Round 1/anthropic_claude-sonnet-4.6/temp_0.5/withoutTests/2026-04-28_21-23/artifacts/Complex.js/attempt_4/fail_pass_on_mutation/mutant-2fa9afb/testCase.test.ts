import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function with complex exponent", () => {
  it("should correctly compute (1+i)^(1+i)", () => {
    // (1+i)^(1+i) reaches the general pow computation path
    // With mutation `if (true)`, it would return ZERO instead of the correct value
    // Original: only returns ZERO when a===0 && b===0 && re>0 && im>=0
    const base = new Complex(1, 1);
    const exp = new Complex(1, 1);
    const result = base.pow(exp);
    
    // (1+i)^(1+i) is not zero
    const absSquared = result.re * result.re + result.im * result.im;
    expect(absSquared).toBeGreaterThan(0.01);
  });
});