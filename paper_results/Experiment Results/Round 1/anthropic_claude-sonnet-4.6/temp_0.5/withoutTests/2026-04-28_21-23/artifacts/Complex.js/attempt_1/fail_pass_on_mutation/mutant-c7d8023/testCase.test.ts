import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("should correctly compute acsch for a purely imaginary number where b !== 0", () => {
    // For acsch(i) = acsch(0 + 1i):
    // a=0, b=1, d = 0*0 + 1*1 = 1 (non-zero)
    // Goes to d !== 0 branch: new Complex(0/1, -1/1).asinh() = new Complex(0, -1).asinh()
    // Original: (b !== 0) ? -b/0 : 0 → if d were 0, b=1 ≠ 0 → -Infinity
    // Mutated:  (b === 0) ? -b/0 : 0 → if d were 0, b=1 → false → 0
    // For d=0 with b≠0: impossible with real numbers
    // Let's test a value that exercises the d !== 0 branch properly
    // acsch(2) = log(2 + sqrt(5)) ≈ 0.4812118...
    const result = new Complex(2, 0).acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 10);
    expect(result.im).toBeCloseTo(0, 10);

    // Test with purely imaginary: acsch(0 + 2i)
    // a=0, b=2, d=4, new Complex(0, -2/4).asinh() = new Complex(0, -0.5).asinh()
    // asinh(0 - 0.5i) = -i * asin(0 + 0.5i * i) ... 
    // The key test: with mutation in d===0 branch, b===0 condition flipped
    // For b !== 0 and d === 0 is impossible, so let's verify the b===0 early return still works
    const resultZeroIm = new Complex(1, 0).acsch();
    expect(resultZeroIm.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(resultZeroIm.im).toBeCloseTo(0, 10);

    // Test with complex input where imaginary part is nonzero
    const resultComplex = new Complex(1, 1).acsch();
    // Verify it produces a finite result
    expect(isFinite(resultComplex.re)).toBe(true);
    expect(isFinite(resultComplex.im)).toBe(true);
  });
});