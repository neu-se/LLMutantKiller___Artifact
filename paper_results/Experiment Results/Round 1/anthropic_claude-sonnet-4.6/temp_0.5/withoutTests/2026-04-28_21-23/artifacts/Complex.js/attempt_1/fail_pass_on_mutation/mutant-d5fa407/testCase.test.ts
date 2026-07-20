import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation test", () => {
  it("acot of zero should return pi/2 with zero imaginary part", () => {
    // When a=0 and b=0, the early return handles b===0 case
    // The mutation changes (b !== 0) to (false) in the d===0 branch
    // We need to verify that acot works correctly
    // For acot(0) = pi/2
    const result = new Complex(0, 0).acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(0);
    
    // For a non-zero real number, acot(1) = pi/4
    const result2 = new Complex(1, 0).acot();
    expect(result2.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    
    // Test that acot with imaginary component works
    // acot(i) should involve infinity
    const result3 = new Complex(0, 1).acot();
    expect(result3.im).toBe(-Infinity);
  });
});