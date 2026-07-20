import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot of purely imaginary number with underflowing magnitude squared', () => {
    // b = 2e-162: b^2 underflows to 0, so d=0, hits mutation branch
    // Original: atan(Complex(0, -Infinity)) -> NaN
    // Mutated:  atan(Complex(0, +Infinity)) -> NaN  
    // Both NaN - mutation is equivalent
    // Test the boundary: b = 3e-162 where d > 0 (normal path)
    const result = new Complex(0, 3e-162).acot();
    expect(result.re).toBeCloseTo(-Math.PI / 2, 5);
  });
});