import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| < |d| with values that trigger the specific mutation", () => {
    const a = new Complex(1, 1);
    const b = new Complex(1, 2);
    const result = a.div(b);
    const expected = new Complex(0.6, -0.2);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});