import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a real number using log(a + sqrt(a*a + 1))", () => {
    // acsch(a) for real a = log(a + sqrt(a^2 + 1))
    // For a = 2: original = log(2 + sqrt(4 + 1)) = log(2 + sqrt(5))
    //            mutated  = log(2 + sqrt(2/2 + 1)) = log(2 + sqrt(2))
    const a = 2;
    const result = new Complex(a, 0).acsch();
    const expected = Math.log(a + Math.sqrt(a * a + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});