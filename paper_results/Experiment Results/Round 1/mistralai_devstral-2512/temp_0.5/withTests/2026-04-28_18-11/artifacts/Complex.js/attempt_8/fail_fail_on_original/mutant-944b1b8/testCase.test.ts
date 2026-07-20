import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return correct value for input (0, 0.5)", () => {
    const result = new Complex(0, 0.5).asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-1.0471975511965976);
  });
});