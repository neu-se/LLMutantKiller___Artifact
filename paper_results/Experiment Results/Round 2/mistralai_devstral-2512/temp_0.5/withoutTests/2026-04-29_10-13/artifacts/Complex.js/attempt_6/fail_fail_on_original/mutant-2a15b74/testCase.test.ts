import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| >= |d| with specific values", () => {
    const a = new Complex(8, 4);
    const b = new Complex(2, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(4.4);
    expect(result.im).toBeCloseTo(-0.8);
  });
});