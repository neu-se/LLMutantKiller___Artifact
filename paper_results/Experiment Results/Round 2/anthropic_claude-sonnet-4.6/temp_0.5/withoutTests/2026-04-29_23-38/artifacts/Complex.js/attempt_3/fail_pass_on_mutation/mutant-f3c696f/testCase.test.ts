import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot with subnormal inputs", () => {
  it("should produce NaN when d underflows to zero due to subnormal inputs", () => {
    const tiny = Number.MIN_VALUE;
    const result = new Complex(0, tiny).acot();
    expect(result.isNaN()).toBe(true);
  });
});