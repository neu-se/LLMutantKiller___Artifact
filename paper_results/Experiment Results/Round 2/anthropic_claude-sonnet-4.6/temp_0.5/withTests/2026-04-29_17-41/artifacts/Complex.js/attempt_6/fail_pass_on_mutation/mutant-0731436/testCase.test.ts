import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe("Complex asec", () => {
  it("computes asec correctly for negative imaginary input", () => {
    const c = new Complex(0, -2);
    const result = c.asec();
    const expected = c.inverse().acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});