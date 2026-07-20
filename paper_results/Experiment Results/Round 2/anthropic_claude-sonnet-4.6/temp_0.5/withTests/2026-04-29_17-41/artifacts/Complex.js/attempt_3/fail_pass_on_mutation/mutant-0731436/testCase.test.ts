import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe("Complex asec", () => {
  it("detects mutation in asec d===0 branch: real part differs when a is non-zero subnormal", () => {
    // With a=Number.MIN_VALUE, b=Number.MIN_VALUE:
    // d = a*a + b*b = 0 (underflow), but a !== 0 and b !== 0
    // Original: new Complex(a*0, -b/0).acos() = new Complex(0, -Infinity).acos()
    // Mutated:  new Complex(a*0, 0).acos()    = new Complex(0, 0).acos() = (π/2, 0)
    // Check that a*0 = 0 and b*b = 0
    const a = Number.MIN_VALUE;
    const b = Number.MIN_VALUE;
    expect(a * a).toBe(0);
    expect(b * b).toBe(0);
    expect(b).not.toBe(0);
    
    const c = new Complex(a, b);
    const result = c.asec();
    // Mutated gives acos(0,0) = (π/2, 0)
    // Original gives acos(0, -Infinity) 
    // They differ - original result should NOT equal π/2 with im=0
    const mutatedResult = new Complex(0, 0).acos();
    expect(mutatedResult.re).toBeCloseTo(Math.PI / 2, 5);
    expect(mutatedResult.im).toBeCloseTo(0, 5);
    // Original result should differ from mutated
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 5);
  });
});