import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth satisfies the identity acoth(z) = atanh(1/z)', () => {
    // For z = 0 + 0.5i, acoth(z) should equal atanh(1/z)
    const z = new Complex(0, 0.5);
    const acothResult = z.acoth();
    // 1/z = 1/(0.5i) = -2i
    const invZ = z.inverse();
    const atanhResult = invZ.atanh();
    expect(acothResult.re).toBeCloseTo(atanhResult.re, 10);
    expect(acothResult.im).toBeCloseTo(atanhResult.im, 10);
  });
});