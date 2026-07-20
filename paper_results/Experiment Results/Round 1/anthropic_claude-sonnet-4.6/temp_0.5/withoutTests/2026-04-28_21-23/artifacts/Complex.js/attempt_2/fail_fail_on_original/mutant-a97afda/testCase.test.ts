import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should return a finite result for atan(0 + 2i)', () => {
    // atan(2i) = i * atanh(2) = i * log(3)/2 ≈ 0 + 0.5493i... wait
    // atan(z) where z = 0 + 2i
    // b = 2, so original: if(b === 1) is false, normal computation
    // mutated: if(true) always executes, returns special case value
    const c = new Complex(0, 2);
    const result = c.atan();
    
    // atan(2i) = (i/2) * log((i + 2i)/(i - 2i)) = (i/2)*log(3i/(-i)) = (i/2)*log(-3)
    // = (i/2)*(ln(3) + i*π) = -π/2 + i*ln(3)/2
    // re = -π/2, im = ln(3)/2
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(-Math.PI / 2, 5);
    expect(result.im).toBeCloseTo(Math.log(3) / 2, 5);
  });
});