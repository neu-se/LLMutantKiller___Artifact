import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("detects mutation via asech with subnormal number causing d to underflow", () => {
    // Use a value where a=0 exactly, b is subnormal
    // d = 0 + b*b, and b*b must underflow
    // Number.MIN_VALUE = 5e-324 (smallest positive double)
    // Number.MIN_VALUE * Number.MIN_VALUE = 0 (underflow)
    const b = Number.MIN_VALUE;
    const d = b * b;
    
    if (d !== 0) {
      // If somehow no underflow, skip
      expect(true).toBe(true);
      return;
    }
    
    const z = new Complex(0, b);
    const result = z.asech();
    
    // Original: new Complex(0, -Infinity).acosh() -> NaN
    // Mutated:  new Complex(0, 0).acosh() -> Complex(0, pi/2)
    expect(isNaN(result.re)).toBe(true);
  });
});