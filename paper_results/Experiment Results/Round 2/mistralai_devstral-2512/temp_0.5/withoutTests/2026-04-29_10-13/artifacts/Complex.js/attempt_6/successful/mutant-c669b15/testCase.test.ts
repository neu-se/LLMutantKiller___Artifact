import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should correctly handle division when |c| exactly equals |d|", () => {
    const a = new Complex(2, 2);
    const b = new Complex(2, -2);
    const result = a.div(b);
    expect(result.re).toBe(0);
    expect(result.im).toBe(1);
  });
});