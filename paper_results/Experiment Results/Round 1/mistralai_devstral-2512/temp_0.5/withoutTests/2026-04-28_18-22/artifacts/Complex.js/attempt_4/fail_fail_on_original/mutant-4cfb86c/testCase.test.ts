import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should handle division by zero correctly for non-zero real part", () => {
    const result = new Complex(1, 0).acot();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});