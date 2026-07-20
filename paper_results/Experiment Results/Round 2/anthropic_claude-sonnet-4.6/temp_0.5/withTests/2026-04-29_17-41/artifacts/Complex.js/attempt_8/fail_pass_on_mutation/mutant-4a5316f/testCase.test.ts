import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('should match atanh(1/z) for complex z', () => {
    // acoth(z) = atanh(1/z)
    // Test with z = 3 + 4i: 1/z = (3-4i)/25 = 0.12 - 0.16i
    const z = new Complex(3, 4);
    const acothResult = z.acoth();
    const atanhResult = z.inverse().atanh();
    expect(acothResult.re).toBeCloseTo(atanhResult.re, 10);
    expect(acothResult.im).toBeCloseTo(atanhResult.im, 10);
  });
});