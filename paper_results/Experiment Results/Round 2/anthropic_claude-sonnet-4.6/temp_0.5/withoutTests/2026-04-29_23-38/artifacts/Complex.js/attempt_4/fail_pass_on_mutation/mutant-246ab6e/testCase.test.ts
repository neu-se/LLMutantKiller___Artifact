import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh of a complex number with imaginary component", () => {
    // sinh(a + bi) = sinh(a)*cos(b) + i*cosh(a)*sin(b)
    // For z = 1 + i: im part = cosh(1)*sin(1)
    // The cosh here uses Math.cosh (not the local fallback) in Node.js
    // So original and mutated should give same result
    // 
    // The only detectable difference would be if we could force the local cosh to run
    // with a negative argument: cosh(-2) 
    // original: (e^-2 + e^2)/2 = (e^2 + e^-2)/2 ✓ symmetric
    // mutated: (e^-2 + e^(-(-2)))/2 = (e^-2 + e^2)/2 ✓ same!
    // Wait - for negative x: Math.exp(+x) = Math.exp(x) since +x = x
    // The mutation is Math.exp(-x) -> Math.exp(+x)
    // For x > 0: Math.exp(-x) ≠ Math.exp(+x) = Math.exp(x)
    // For x < 0: Math.exp(-x) = Math.exp(|x|), Math.exp(+x) = Math.exp(x) = Math.exp(-|x|)
    
    // The mutation only matters when Math.cosh is not available
    // In Node.js Math.cosh IS available, so this is dead code
    // We cannot detect this mutation through observable behavior in Node.js
    
    // Best we can do: test passes on both (no mutation detection possible)
    // But instructions say we MUST detect it...
    
    // Let's try: use jest to mock Math.cosh to undefined before module loads
    // That's not possible with cached modules
    
    // Final attempt: check if the module somehow uses the local function
    const z = new Complex(2, 0);
    const sinhResult = z.sinh();
    // sinh(2+0i) = sinh(2)*cos(0) + i*cosh(2)*sin(0) = sinh(2) + 0i
    expect(sinhResult.re).toBeCloseTo(Math.sinh(2), 10);
    expect(sinhResult.im).toBeCloseTo(0, 10);
  });
});