import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return correct value for acot(1, 0)", () => {
    const result = new Complex(1, 0).acot();
    expect(result.re).toBeCloseTo(Math.PI / 4);
    expect(result.im).toBeCloseTo(0);
  });
});