import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return correct value for acot(0, 0)", () => {
    const result = new Complex(0, 0).acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});