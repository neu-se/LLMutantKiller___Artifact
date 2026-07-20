import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc for a non-zero complex number", () => {
    // acsc(2) should return asin(1/2) = pi/6 ≈ 0.5236
    // For a real number a=2, b=0:
    // d = a*a + b*b = 4
    // With original code (d !== 0) is true, so we return new Complex(a/d, -b/d).asin()
    // = new Complex(0.5, 0).asin() = asin(0.5) ≈ pi/6
    // With mutated code (d === 0) is false for d=4, so we take the else branch
    // which returns new Complex((a !== 0) ? a/0 : 0, (b !== 0) ? -b/0 : 0).asin()
    // = new Complex(Infinity, 0).asin() which gives a different result
    
    const result = new Complex(2, 0).acsc();
    const expected = Math.PI / 6; // asin(0.5)
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});