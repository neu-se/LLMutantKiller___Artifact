import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| >= |d| with specific values", () => {
    const a = new Complex(10, 5);
    const b = new Complex(2, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(5.5);
    expect(result.im).toBeCloseTo(-1.5);
  });
});