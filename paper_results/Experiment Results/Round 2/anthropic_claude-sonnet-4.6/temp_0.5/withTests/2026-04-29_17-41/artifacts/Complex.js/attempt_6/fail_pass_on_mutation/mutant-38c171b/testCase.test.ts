import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("detects mutation via acsch with subnormal inputs", () => {
    const v = Number.MIN_VALUE;
    // Verify the key behaviors
    const asinhOfZero = new Complex(0, 0).asinh();
    const asinhOfInfinity = new Complex(0, Infinity).asinh();
    
    // These should differ
    expect(asinhOfZero.re).not.toBe(asinhOfInfinity.re);
    
    // Now test acsch
    const c = new Complex(v, -v);
    const result = c.acsch();
    // Original: new Complex(0, Infinity).asinh() 
    // Mutated: new Complex(0, 0).asinh()
    expect(result.re).toBe(asinhOfInfinity.re);
    expect(result.re).not.toBe(asinhOfZero.re);
  });
});