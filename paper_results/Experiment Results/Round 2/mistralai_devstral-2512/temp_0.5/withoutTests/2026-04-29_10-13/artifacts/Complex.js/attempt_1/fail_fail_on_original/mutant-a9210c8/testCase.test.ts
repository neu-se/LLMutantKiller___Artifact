import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.23499777411427393);
    expect(result.im).toBeCloseTo(-0.4284948542243888);
  });
});