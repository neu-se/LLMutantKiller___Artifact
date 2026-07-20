import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return correct value for input (1, 1)", () => {
    const result = new Complex(1, 1).asec();
    expect(result.re).toBeCloseTo(0.443);
    expect(result.im).toBeCloseTo(-1.035);
  });
});