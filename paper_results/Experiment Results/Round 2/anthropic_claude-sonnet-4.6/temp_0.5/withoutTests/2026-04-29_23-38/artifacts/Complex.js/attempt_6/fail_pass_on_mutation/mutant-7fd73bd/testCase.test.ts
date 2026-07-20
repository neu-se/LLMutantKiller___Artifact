import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('atanh of a complex number should give correct result', () => {
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    // atanh(0.5+0.5i) computed reference value
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});