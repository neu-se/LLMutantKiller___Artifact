import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('should match asinh(1/z) for z = 1+i where d=0', () => {
    const z = new Complex(1, 1);
    const result = z.acsch();
    // acsch(z) should equal asinh(1/z) mathematically
    // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    const expected = new Complex(0.5, -0.5).asinh();
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});