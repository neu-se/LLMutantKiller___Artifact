import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc function', () => {
  it('should correctly compute acsc for a complex number with non-zero imaginary part', () => {
    // acsc(i) = acsc(0 + 1i)
    // For z = i: d = 0 + 1 = 1, so we use new Complex(0/1, -1/1).asin() = new Complex(0, -1).asin()
    // This tests the d !== 0 branch with b != 0
    const z = new Complex(0, 1);
    const result = z.acsc();
    
    // asin(-i) = -i * log(-i*i + sqrt(1 - (-i)^2)) = -i * log(1 + sqrt(2))... 
    // Let's just verify the result is consistent with the original behavior
    // acsc(i) = asin(1/i) = asin(-i)
    // asin(-i) = -i * log(-i*i + sqrt(1 - (-i)^2)) = -i * log(1 + sqrt(2))
    // = -i * ln(1 + sqrt(2)) = Complex(0, -ln(1+sqrt(2)))
    const expected_im = -Math.log(1 + Math.sqrt(2));
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected_im, 10);
  });
});