import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan mutation detection', () => {
  it('should correctly compute atan for a real number', () => {
    // atan(1 + 0i) should equal π/4 ≈ 0.7853981633974483
    const c = new Complex(1, 0);
    const result = c.atan();
    
    // With original code: b=0, so if(b===1) is false, normal computation proceeds
    // With mutated code: if(true) always executes, causing wrong result
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});