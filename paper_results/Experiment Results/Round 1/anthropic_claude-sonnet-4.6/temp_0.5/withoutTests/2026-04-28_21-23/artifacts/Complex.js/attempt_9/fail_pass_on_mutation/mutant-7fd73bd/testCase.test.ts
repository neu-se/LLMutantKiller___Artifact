import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex mutation detection', () => {
  it('should compute acosh correctly for real number greater than 1', () => {
    // acosh uses acos which uses log
    // For acosh(2): result should be log(2 + sqrt(3))
    const z = new Complex(2, 0);
    const result = z.acosh();
    const expected = Math.log(2 + Math.sqrt(3));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});