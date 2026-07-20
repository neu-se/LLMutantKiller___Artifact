import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return correct value for acot(0, 1)", () => {
    const result = new Complex(0, 1).acot();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Infinity);
  });
});