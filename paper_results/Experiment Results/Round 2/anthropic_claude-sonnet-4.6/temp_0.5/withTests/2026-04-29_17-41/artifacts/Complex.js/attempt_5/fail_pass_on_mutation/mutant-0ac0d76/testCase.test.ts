import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex log', () => {
  it('log of zero should produce -Infinity real part', () => {
    const z = new Complex(0, 0).log();
    expect(z.re).toBe(-Infinity);
  });
});