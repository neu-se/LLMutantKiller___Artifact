import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot with underflow", () => {
  it("should handle acot where imaginary part squared underflows to zero", () => {
    // Use the smallest positive double so that b*b underflows to 0
    // This means d = a*a + b*b = 0, but b !== 0
    // Original: uses (b !== 0) ? -b/0 : 0 => -Infinity for imaginary part
    // Mutated:  uses (false) ? -b/0 : 0  => 0 for imaginary part
    const tinyB = 5e-324;
    const z = new Complex(0, tinyB);

    // Verify underflow actually occurs
    expect(tinyB * tinyB).toBe(0);
    expect(tinyB).not.toBe(0);

    const result = z.acot();

    // Original code: new Complex(0, -Infinity).atan()
    // atan with a=0, b=-Infinity:
    //   d = 0*0 + (1 - (-Infinity))^2 = Infinity
    //   t1 = new Complex((1 - Inf - 0)/Inf, 0/Inf).log() = new Complex(-Inf/Inf, 0).log()
    //      = new Complex(NaN, 0).log()
    // Actually let's just check it's NOT equal to atan(0,0) = Complex(0,0)
    // Mutated code returns new Complex(0, 0).atan() = Complex(0, 0)
    const atanZero = new Complex(0, 0).atan();
    
    // The results should differ between original and mutated
    expect(result.re === atanZero.re && result.im === atanZero.im).toBe(false);
  });
});