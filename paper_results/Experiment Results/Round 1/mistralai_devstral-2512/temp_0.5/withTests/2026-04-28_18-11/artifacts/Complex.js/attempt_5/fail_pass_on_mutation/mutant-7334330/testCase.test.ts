import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| < |d|", () => {
    const a = new Complex(1, 1);
    const b = new Complex(2, 3);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(0.4, 1);
    expect(result.im).toBeCloseTo(-0.1, 1);
  });
});