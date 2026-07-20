import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add", () => {
  it("adding a real number to infinity should return INFINITY", () => {
    const c = new Complex(1, 0);
    const result = c.add(Infinity, 0);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});