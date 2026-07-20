import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with infinity", () => {
  it("should return Infinity when adding a finite number to Infinity", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    const result = inf.add(finite);
    expect(result.isInfinite()).toBe(true);
  });
});