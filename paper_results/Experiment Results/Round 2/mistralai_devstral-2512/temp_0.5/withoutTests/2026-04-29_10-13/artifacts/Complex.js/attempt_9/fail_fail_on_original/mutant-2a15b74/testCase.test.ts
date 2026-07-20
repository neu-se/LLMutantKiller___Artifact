import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| >= |d| with specific values", () => {
    const a = new Complex(9, 3);
    const b = new Complex(3, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(3.1);
    expect(result.im).toBeCloseTo(-0.4);
  });
});