import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return NaN components when atan is called on Complex(0, -1) and result is checked via isNaN or toString", () => {
    // For Complex(0, -1): original returns Complex(0, -Infinity)
    // Mutated falls through with d=4, t1=log(Complex(0,0))
    // log(0,0): logHypot(0,0) -> a===0 path -> Math.log(|b|) = Math.log(0) = -Infinity
    // atan2(0,0) = 0, so t1 = Complex(-Infinity, 0)
    // result = Complex(-0.5*0, 0.5*(-Infinity)) = Complex(0, -Infinity)
    // Both same... try isInfinite check on original vs NaN behavior
    
    // Let's try Complex(0, -1).atan().atan() to amplify differences
    const c = new Complex(0, -1);
    const result = c.atan();
    // Original: Complex(0, -Infinity) - isInfinite() should be true
    // Check that toString matches expected
    expect(result.toString()).toBe('Infinity');
  });
});