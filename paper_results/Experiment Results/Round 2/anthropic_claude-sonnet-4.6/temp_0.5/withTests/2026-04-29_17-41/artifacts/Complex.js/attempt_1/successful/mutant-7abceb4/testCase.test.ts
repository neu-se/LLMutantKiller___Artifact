import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(i) where input is 0 + 1i
    // Original: b !== 0, so uses general formula: new Complex(0/1, -1/1).asinh() = new Complex(0, -1).asinh()
    // Mutated: if(true) always takes real path, returns Complex(Infinity, 0) for a=0
    const c = new Complex(0, 1);
    const result = c.acsch();
    
    // The result should be finite (not Infinity)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    
    // acsch(i) = asinh(1/i) = asinh(-i) = -i * pi/2
    // So re should be 0 and im should be -pi/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});