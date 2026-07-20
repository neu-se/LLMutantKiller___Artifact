import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return correct value for input (2, 0)", () => {
    const result = new Complex(2, 0).asec();
    expect(result.re).toBeCloseTo(Math.PI / 3);
    expect(result.im).toBeCloseTo(0);
  });
});