import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe("Complex asec", () => {
  it("detects mutation using carefully crafted subnormal value", () => {
    // Create a value whose square is exactly 0 in double precision
    // but the value itself is non-zero
    // Use DataView to create the smallest positive subnormal: bit pattern 0x0000000000000001
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setUint32(4, 0, false); // high bytes
    view.setUint32(0, 1, false); // low bytes - smallest positive subnormal
    const tiny = view.getFloat64(0, false);
    
    // tiny is 5e-324 = Number.MIN_VALUE
    // tiny * tiny should be 0
    const c = new Complex(tiny, tiny);
    const result = c.asec();
    
    // If d===0 branch reached:
    // Original: NaN, Mutated: (π/2, 0)
    // If d!==0 branch reached: both same
    // We assert original behavior
    const d = tiny * tiny * 2;
    if (d === 0) {
      expect(isNaN(result.re)).toBe(true);
    } else {
      expect(result.re).toBeCloseTo(new Complex(tiny/d, -tiny/d).acos().re, 5);
    }
  });
});