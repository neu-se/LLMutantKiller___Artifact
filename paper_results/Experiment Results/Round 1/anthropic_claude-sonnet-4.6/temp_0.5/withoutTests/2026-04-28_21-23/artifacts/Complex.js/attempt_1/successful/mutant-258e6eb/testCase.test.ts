import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return correct imaginary part for atanh when real part > 1 and imaginary part is 0", () => {
    // When a > 1 and b === 0, noIM is true
    // In original code: if (noIM) { x['im'] = -x['im']; }
    // In mutated code: if (true) { x['im'] = -x['im']; } -- always negates im
    
    // For a real number > 1, atanh should return a complex number
    // atanh(2) = 0.5 * log(3) + i * pi/2
    // The imaginary part should be positive pi/2 for real input > 1
    // But with noIM=true, the original code negates it to -pi/2
    
    // Let's test with a complex number where b !== 0 (noIM = false)
    // For z = 0 + 2i, noIM = false (a=0, b=2)
    // Original: im stays as computed
    // Mutated: im gets negated
    
    const z = new Complex(0, 2);
    const result = z.atanh();
    
    // atanh(2i) = i * atan(2)
    // The imaginary part should be atan(2) ≈ 1.1071487177940904
    const expected = Math.atan(2);
    
    expect(result.im).toBeCloseTo(expected, 10);
  });
});