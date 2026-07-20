import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return a finite value for (0, 1) input", () => {
    const result = new Complex(0, 1).acsc();
    expect(result.isFinite()).toBe(true);
  });
});