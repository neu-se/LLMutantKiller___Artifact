import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should correctly handle subtraction where only z is infinite", () => {
    // Create a complex where only the argument z is infinite, not `this`
    // Using Complex with one finite and one checking the second placeholder check
    // The placeholder is the FIRST if-block returning NaN
    // Original ||: if either is infinite -> NaN  
    // Mutated &&: if both are infinite -> NaN, else if either infinite -> Infinity
    
    // So: finite.sub(INFINITY) 
    // Original ||: NaN
    // Mutated &&: skips first, hits second || -> Infinity
    // But tests show original gives Infinity for finite.sub(INFINITY)...
    
    // This means original first check must be && not ||
    // So mutation goes from && to ||:
    // finite.sub(INFINITY): original && skips -> second || -> Infinity
    // mutated ||: first check -> NaN
    
    const result = new Complex(3, 4).sub(Complex.INFINITY);
    // Original (first check &&): false && true = skip, second || = Infinity
    // Mutated (first check ||): false || true = NaN
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});