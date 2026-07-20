import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| > |d|", () => {
    const a = new Complex(3, 1);
    const b = new Complex(1, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(-1);
  });
});