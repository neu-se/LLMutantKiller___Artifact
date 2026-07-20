import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct value for non-zero real input", () => {
    const result = new Complex(2, 0).asec();
    expect(result.re).toBeCloseTo(Math.PI/2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});