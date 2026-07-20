import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a complex number with real=1 and imaginary=2", () => {
    const c = new Complex(1, 2);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.2230520268820846, 10);
    expect(result.im).toBeCloseTo(-0.2706061574494447, 10);
  });
});