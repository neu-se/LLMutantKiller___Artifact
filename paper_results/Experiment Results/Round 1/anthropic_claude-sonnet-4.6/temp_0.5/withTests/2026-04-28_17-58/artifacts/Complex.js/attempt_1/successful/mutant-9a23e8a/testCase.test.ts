import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a real positive number", () => {
    // acsch(a) for real a with b=0 should be log(a + sqrt(a^2 + 1))
    // Original: Math.log(a + Math.sqrt(a * a + 1))
    // Mutant:   Math.log(a + Math.sqrt(a / a + 1))  = Math.log(a + sqrt(2))
    // For a = 2:
    //   Original: Math.log(2 + Math.sqrt(4 + 1)) = Math.log(2 + sqrt(5))
    //   Mutant:   Math.log(2 + Math.sqrt(2/2 + 1)) = Math.log(2 + sqrt(2))
    const result = new Complex(2, 0).acsch();
    const expected = Math.log(2 + Math.sqrt(4 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});