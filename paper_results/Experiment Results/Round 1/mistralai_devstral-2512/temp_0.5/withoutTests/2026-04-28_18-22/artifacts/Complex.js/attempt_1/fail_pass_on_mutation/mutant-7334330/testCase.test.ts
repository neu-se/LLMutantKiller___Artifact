import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| < |d|", () => {
    const a = new Complex(2, 3);
    const b = new Complex(1, 2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(1.6, 10);
    expect(result.im).toBeCloseTo(-0.2, 10);
  });
});