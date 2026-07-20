import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot with underflowing d: sign of imaginary infinity affects atan result', () => {
    // Force the d===0 branch with b != 0 via underflow
    // Use negative b so original gives +Infinity and mutated gives -Infinity
    const result = new Complex(0, -5e-324).acot();
    // Original: atan(Complex(0, +Infinity)) 
    // Mutated:  atan(Complex(0, -Infinity))
    // Check if result differs
    expect(result.isNaN()).toBe(true);
  });
});