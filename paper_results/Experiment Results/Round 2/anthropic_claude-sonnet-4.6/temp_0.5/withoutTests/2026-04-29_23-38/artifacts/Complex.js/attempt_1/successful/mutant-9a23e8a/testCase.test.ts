import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a real number where a*a+1 differs from a/a+1", () => {
    // For a real number a (with b=0), acsch(a) = log(a + sqrt(a^2 + 1))
    // Original: Math.log(a + Math.sqrt(a * a + 1))
    // Mutant:   Math.log(a + Math.sqrt(a / a + 1))
    // For a = 2: original = log(2 + sqrt(5)), mutant = log(2 + sqrt(2))
    const a = 2;
    const result = new Complex(a, 0).acsch();
    const expected = Math.log(a + Math.sqrt(a * a + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});