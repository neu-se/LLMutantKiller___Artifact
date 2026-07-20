import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct result for acot(0, 1)", () => {
    const result = new Complex(0, 1).acot();
    expect(result.im).toBe(-Infinity);
  });
});