import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acosh mutation detection', () => {
  it('should compute acosh correctly for a complex number where the else branch is taken', () => {
    // acosh(1 + i) - this should hit the else branch (res['im'] > 0)
    // In the mutated code, res['im'] = -res[""] = -undefined = NaN
    const result = new Complex(1, 1).acosh();
    
    // The correct value of acosh(1+i) is approximately 1.0612... + 0.9046...i
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(0.9045568943023814, 10);
  });
});