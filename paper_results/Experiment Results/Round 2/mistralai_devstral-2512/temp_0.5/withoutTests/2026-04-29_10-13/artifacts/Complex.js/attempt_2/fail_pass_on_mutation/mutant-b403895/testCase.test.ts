import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct value for zero input", () => {
    const result = new Complex(0, 0).asec();
    expect(result.isInfinite()).toBe(true);
  });
});