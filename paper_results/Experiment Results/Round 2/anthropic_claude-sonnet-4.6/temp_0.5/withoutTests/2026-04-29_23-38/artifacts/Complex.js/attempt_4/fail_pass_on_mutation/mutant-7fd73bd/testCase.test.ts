import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('atan of purely imaginary number less than 1 should give correct result', () => {
    const z = new Complex(0, 0.5);
    const result = z.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.atanh(0.5), 10);
  });
});