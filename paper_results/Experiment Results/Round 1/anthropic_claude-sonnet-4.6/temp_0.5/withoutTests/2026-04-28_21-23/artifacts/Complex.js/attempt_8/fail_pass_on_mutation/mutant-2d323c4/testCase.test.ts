import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch(0) returns infinity", () => {
    const z = new Complex(0, 0);
    const result = z.acsch();
    expect(result.isInfinite()).toBe(true);
  });
});