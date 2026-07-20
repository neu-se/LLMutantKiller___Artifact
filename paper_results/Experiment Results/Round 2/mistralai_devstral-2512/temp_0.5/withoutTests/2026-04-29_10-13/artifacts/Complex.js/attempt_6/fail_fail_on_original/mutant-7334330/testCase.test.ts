import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| < |d| with specific values that trigger the mutation", () => {
    const a = new Complex(1, 1);
    const b = new Complex(2, 3);
    const result = a.div(b);
    const expected = new Complex(0.46, -0.12);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});