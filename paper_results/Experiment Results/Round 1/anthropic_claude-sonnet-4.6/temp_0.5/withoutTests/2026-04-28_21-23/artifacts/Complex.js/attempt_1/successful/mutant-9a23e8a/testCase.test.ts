import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a real number where the argument to sqrt uses a*a not a/a", () => {
    // acsch(2) = log(2 + sqrt(2*2 + 1)) = log(2 + sqrt(5))
    // With mutation: log(2 + sqrt(2/2 + 1)) = log(2 + sqrt(2))
    const result = new Complex(2, 0).acsch();
    const expected = Math.log(2 + Math.sqrt(2 * 2 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});