import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly compute sech for a purely imaginary number", () => {
    const c = new Complex(0, Math.PI/4);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.859094176502359, 10);
    expect(result.im).toBeCloseTo(-0.3634053806069193, 10);
  });
});