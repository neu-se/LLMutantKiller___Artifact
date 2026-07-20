import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a real number (b === 0, a !== 0)", () => {
    // When b === 0 and a !== 0, acsch(a) = log(a + sqrt(a^2 + 1))
    const result = new Complex(5, 0).acsch();
    const expected = Math.log(5 + Math.sqrt(26));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});