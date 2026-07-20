import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinity", () => {
  it("should return INFINITY when adding a finite number to an infinite complex number", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    const result = inf.add(finite);
    expect(result.isInfinite()).toBe(true);
  });
});