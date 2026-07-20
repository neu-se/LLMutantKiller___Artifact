import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return zero when raising 0+0i to power with positive real and zero imaginary via string parse', () => {
    // Test (0+0i)^(2+0i) going through the z['im']===0 path in switch
    // For case 0: (z['re'] % 4 + 4) % 4 === 0, returns new Complex(Math.pow(0, z['re']), 0)
    // z['re'] = 4 gives case 0: Math.pow(0, 4) = 0
    const result = new Complex(0, 0).pow(new Complex(4, 0));
    expect(result.re).toBeGreaterThanOrEqual(0);
    expect(result.im).toBe(0);
    // Now test with negative imaginary exponent - neither version returns ZERO
    const result2 = new Complex(0, 0).pow(new Complex(1, -1));
    // This should give Infinity or some non-zero result in both versions
    // The key difference: z['im'] = 0 case
    // Since switch handles z['im']=0, let's verify the switch case 1 behavior
    // case 1: new Complex(0, Math.pow(b, z['re'])) where b=0
    const result3 = new Complex(0, 0).pow(new Complex(1, 0));
    expect(result3.re).toBe(0);
    expect(result3.im).toBe(0);
  });
});