import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly handle division when |c| >= |d| with specific values", () => {
    const a = new Complex(4, 6);
    const b = new Complex(2, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2.8, 10);
    expect(result.im).toBeCloseTo(2.4, 10);
  });
});