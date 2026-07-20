import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with partial infinity", () => {
  it("should return INFINITY when adding finite number to complex with only real part infinite", () => {
    const partialInf = new Complex(Infinity, 0);
    const finite = new Complex(1, 2);
    const result = partialInf.add(finite);
    expect(result.isInfinite()).toBe(true);
  });
});