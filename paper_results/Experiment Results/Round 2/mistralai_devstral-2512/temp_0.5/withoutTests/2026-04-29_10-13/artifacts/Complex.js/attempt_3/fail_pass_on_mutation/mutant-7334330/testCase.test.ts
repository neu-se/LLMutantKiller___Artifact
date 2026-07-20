import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| < |d|", () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.div(b);
    const expected = new Complex(0.44, 0.08);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});