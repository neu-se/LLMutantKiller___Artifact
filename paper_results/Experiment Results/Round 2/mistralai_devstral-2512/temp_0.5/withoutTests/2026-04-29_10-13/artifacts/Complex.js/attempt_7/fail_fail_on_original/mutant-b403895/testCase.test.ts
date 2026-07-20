import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct value for (0.5, 0) input", () => {
    const result = new Complex(0.5, 0).asec();
    expect(result.re).toBeCloseTo(1.0471975511965976, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});