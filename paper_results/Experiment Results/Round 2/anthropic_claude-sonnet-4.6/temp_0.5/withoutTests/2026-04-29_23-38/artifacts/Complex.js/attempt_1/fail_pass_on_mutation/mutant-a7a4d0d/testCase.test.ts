import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh', () => {
  it('should correctly compute acosh for a complex number where acos result has positive imaginary part', () => {
    // acosh(-2) should be approximately log(2 + sqrt(3)) * i + pi
    // For a purely imaginary input like Complex(0, 2), the acos result will have im > 0
    // which means the mutation (always taking the if branch) will give wrong result
    const z = new Complex(0, 2);
    const result = z.acosh();
    
    // The correct acosh(2i) ≈ 1.4436 + 1.5708i (approximately)
    // With mutation, the branches are swapped giving wrong result
    const expected = new Complex(0, 2).acosh();
    
    // Let's use a specific known value
    // acosh(2i): acos(2i) has im > 0, so original takes else branch
    // mutation takes if branch, giving different result
    expect(result.re).toBeCloseTo(1.4436354751788103, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});