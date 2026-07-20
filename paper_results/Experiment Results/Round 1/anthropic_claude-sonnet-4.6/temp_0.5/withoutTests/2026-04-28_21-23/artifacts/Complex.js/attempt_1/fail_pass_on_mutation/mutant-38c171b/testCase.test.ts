import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch for a purely imaginary number where b !== 0 and d === 0 is unreachable, but normal acsch works correctly", () => {
    // Test acsch(i) = -i * pi/2 + log(1 + sqrt(2))
    // acsch(1) = log(1 + sqrt(2)) ≈ 0.8813735870195430
    const result = new Complex(1, 0).acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);

    // acsch(0 + 2i): d = 0 + 4 = 4 != 0, goes into first branch
    // acsch(2i) = (1/(2i)).asinh() = (-i/2).asinh()
    const result2 = new Complex(0, 2).acsch();
    const expected = new Complex(0, -0.5).asinh();
    expect(result2.re).toBeCloseTo(expected.re, 10);
    expect(result2.im).toBeCloseTo(expected.im, 10);
  });
});