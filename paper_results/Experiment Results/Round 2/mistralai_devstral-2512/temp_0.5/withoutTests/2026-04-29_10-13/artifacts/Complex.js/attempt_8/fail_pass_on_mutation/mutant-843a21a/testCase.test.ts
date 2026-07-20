import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should return Infinity when input is zero", () => {
    const c = new Complex(0, 0);
    const result = c.asech();
    expect(result.isInfinite()).toBe(true);
  });
});