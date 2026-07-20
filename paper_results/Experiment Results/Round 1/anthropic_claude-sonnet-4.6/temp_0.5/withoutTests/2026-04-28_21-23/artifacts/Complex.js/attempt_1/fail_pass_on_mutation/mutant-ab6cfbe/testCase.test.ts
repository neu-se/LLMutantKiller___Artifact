import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('log of zero should return -Infinity real part', () => {
    const result = new Complex(0, 0).log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});