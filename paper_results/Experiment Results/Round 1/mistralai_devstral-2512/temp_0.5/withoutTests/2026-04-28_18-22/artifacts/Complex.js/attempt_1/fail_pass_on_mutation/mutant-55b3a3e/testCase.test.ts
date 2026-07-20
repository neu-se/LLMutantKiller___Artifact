import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return Infinity for (0, 0) input", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.isInfinite()).toBe(true);
  });
});