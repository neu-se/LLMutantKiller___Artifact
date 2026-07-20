import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan mutation detection', () => {
  it('should correctly compute atan for a complex number with imaginary part not equal to 1', () => {
    // For z = 1 + 0i, atan should return approximately pi/4
    // Original: b === 0, so the if(b===1) branch is skipped, normal computation proceeds
    // Mutated: if(true) always executes, causing wrong behavior
    const z = new Complex(1, 0);
    const result = z.atan();
    
    // atan(1 + 0i) = pi/4 ≈ 0.7853981633974483
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});