import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should handle addition of finite and infinite complex numbers correctly", () => {
    const finite = new Complex(1, 0);
    const infinite = Complex.INFINITY;
    const result = finite.add(infinite);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});