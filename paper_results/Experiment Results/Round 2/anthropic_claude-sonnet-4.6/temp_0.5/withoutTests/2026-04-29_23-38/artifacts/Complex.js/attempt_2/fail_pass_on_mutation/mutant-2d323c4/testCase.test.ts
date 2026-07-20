import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('computes acsch correctly for z where a*a - b*b = 0, verifying against asinh(1/z)', () => {
    // For z = 2+2i, d = 4 - 4 = 0
    // Original code: fallback branch -> new Complex((2 !== 0) ? 2/0 : 0, (-2/0)).asinh()
    //              = new Complex(Infinity, -Infinity).asinh()
    // Mutated code: first branch -> new Complex(2/0, -2/0).asinh()
    //             = new Complex(Infinity, -Infinity).asinh()
    // Still the same...
    
    // Let me try z = 1+i, verify against the mathematical definition acsch(z) = log(1/z + sqrt(1/z^2 + 1))
    const z = new Complex(1, 1);
    const result = z.acsch();
    
    // Mathematical reference: acsch(1+i) = asinh(1/(1+i))
    // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    // asinh(0.5 - 0.5i)
    const reference = new Complex(0.5, -0.5).asinh();
    
    expect(result.re).toBeCloseTo(reference.re, 10);
    expect(result.im).toBeCloseTo(reference.im, 10);
  });
});