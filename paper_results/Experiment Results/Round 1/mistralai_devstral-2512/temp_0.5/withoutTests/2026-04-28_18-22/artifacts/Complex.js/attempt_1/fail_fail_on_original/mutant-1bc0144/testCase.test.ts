import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute the arc hyperbolic secant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.1678, 4);
    expect(result.im).toBeCloseTo(-1.2309, 4);
  });
});