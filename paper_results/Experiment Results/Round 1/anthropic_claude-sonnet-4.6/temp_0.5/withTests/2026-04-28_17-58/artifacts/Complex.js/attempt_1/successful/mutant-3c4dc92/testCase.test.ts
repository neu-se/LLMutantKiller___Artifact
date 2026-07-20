import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('atanh mutation detection', () => {
  it('should correctly compute atanh for a complex number where d depends on oneMinus squared', () => {
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    // Expected: atanh(0.5 + 0.5i) computed with correct formula
    const expected = new Complex(0.4023594781085251, 0.5535743588970452);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});