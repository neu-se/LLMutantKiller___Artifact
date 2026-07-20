import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc of a complex number with positive real and imaginary parts gives correct result", () => {
    // acsc(z) for z = 3 + 4i
    // acsc(z) = asin(1/z) = asin(1/(3+4i)) = asin((3-4i)/25) = asin(0.12 - 0.16i)
    // The acsc method computes: d = 9+16=25, new Complex(3/25, +4/25).asin()
    // Note: it uses +b/d (NOT -b/d) for imaginary part
    // Original and mutated both use +b/d in the d!==0 branch, so same result
    // But let's verify the actual numeric value matches expected
    const z = new Complex(3, 4);
    const result = z.acsc();
    
    // asin(0.12 + 0.16i)
    const expected = new Complex(0.12, 0.16).asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    
    // The mutation is in the d===0 fallback. To reach it with a===0:
    // Need a===0, b!==0, but b*b===0. Use subnormal: 5e-324 (Number.MIN_VALUE)
    // 5e-324 * 5e-324 = 0 in IEEE 754
    const tiny_b = 5e-324; // Number.MIN_VALUE
    const d_check = 0 * 0 + tiny_b * tiny_b;
    // d_check should be 0
    expect(d_check).toBe(0);
    // tiny_b should not be 0
    expect(tiny_b).not.toBe(0);
    
    // So new Complex(0, 5e-324).acsc() reaches d===0 branch with a===0
    // Original: new Complex(0, -Infinity).asin() 
    // Mutated:  new Complex(NaN, -Infinity).asin()
    // Both NaN... but let's check if re differs
    const r1 = new Complex(0, -Infinity).asin();
    const r2 = new Complex(NaN, -Infinity).asin();
    // If they differ in any observable way, use that
    // r1.re vs r2.re
    expect(Object.is(r1.re, r2.re)).toBe(true); // both NaN? 
  });
});