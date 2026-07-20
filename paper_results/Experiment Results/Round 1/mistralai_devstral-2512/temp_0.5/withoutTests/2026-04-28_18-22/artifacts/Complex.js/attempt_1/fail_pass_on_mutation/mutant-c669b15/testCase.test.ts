import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division edge case", () => {
  it("should correctly handle division when |c| == |d|", () => {
    const a = new Complex(1, 1);
    const b = new Complex(1, -1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1);
  });
});