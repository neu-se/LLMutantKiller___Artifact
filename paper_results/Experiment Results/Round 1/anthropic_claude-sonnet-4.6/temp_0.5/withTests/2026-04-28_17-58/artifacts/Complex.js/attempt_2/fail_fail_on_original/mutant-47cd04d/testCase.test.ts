import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method", () => {
  it("should return NaN when adding finite complex to infinity", () => {
    const finite = new Complex(3, 4);
    const result = finite.add(Complex['INFINITY']);
    expect(result.isNaN()).toBe(true);
  });
});