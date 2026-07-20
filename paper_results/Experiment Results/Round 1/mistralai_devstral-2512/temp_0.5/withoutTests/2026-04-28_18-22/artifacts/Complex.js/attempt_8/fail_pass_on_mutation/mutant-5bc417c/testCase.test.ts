import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should return a finite value for input (1, 1)", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(result.isFinite()).toBe(true);
  });
});