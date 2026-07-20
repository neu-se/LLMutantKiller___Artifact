import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp function', () => {
  it('should correctly compute exp of a complex number with non-zero imaginary part', () => {
    // exp(0 + i*π) should equal -1 + 0i (Euler's formula)
    const z = new Complex(0, Math.PI);
    const result = z.exp();
    
    // With mutation (im !== 0 triggers early return of tmp=1, im=0):
    // Original returns: cos(π) + i*sin(π) = -1 + ~0i
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});