import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('should correctly compute asec of a real number with non-zero real part', () => {
    // asec(2) = acos(1/2) = π/3 ≈ 1.0472...
    // Original: a=2, b=0 → condition (a===0 && b===0) is false → proceeds to compute acos
    // Mutated: a=2, b=0 → condition (true && b===0) is true → returns Complex(0, Infinity) WRONG
    const result = new Complex(2, 0).asec();
    
    // The result should be approximately π/3 with no imaginary part
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});