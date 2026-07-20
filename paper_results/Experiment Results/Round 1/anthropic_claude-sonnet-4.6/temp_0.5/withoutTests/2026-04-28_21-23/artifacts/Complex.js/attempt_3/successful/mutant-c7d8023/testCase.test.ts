import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("correctly handles subnormal imaginary input where squared value underflows to zero", () => {
    // 5e-324 is the smallest positive subnormal double
    // When squared, it underflows to 0 in IEEE 754 arithmetic
    // So: a=0, b=5e-324, d = a*a + b*b = 0, but b !== 0
    // This forces execution into the d===0 branch of acsch
    //
    // Original code: (b !== 0) ? -b/0 : 0  → b !== 0 is true  → -Infinity
    //   → new Complex(0, -Infinity).asinh() → NaN result (isNaN = true)
    //
    // Mutated code:  (b === 0) ? -b/0 : 0  → b === 0 is false → 0
    //   → new Complex(0, 0).asinh() → (0, 0) (isNaN = false)
    const result = new Complex(0, 5e-324).acsch();
    
    // The mutated code produces exactly (0, 0) which is not NaN
    // The original code produces NaN
    expect(result.isNaN()).toBe(true);
  });
});