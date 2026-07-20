import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should compute acot correctly when d underflows to zero with positive imaginary part", () => {
    // Use extremely small values so that a*a + b*b underflows to 0 in floating point
    // but b !== 0, triggering the d === 0 branch
    // With a=0 and b=5e-324 (MIN_VALUE), b*b underflows to 0
    const tiny = 5e-324; // Number.MIN_VALUE
    const result = new Complex(0, tiny).acot();
    // Original: new Complex(0, -tiny/0 = -Infinity).atan()
    // atan(0 - Infinity*i): b = -1 case? No, b = -Infinity
    // For atan with a=0, b=-Infinity: d = 0 + (1+Infinity)^2 = Infinity
    // result should be real (im close to 0 or specific value)
    // Mutated: new Complex(0, +Infinity).atan() gives different sign on imaginary
    const result2 = new Complex(0, -tiny).acot();
    // Original: new Complex(0, +Infinity).atan()
    // Mutated: new Complex(0, -Infinity).atan()
    // The two results should be negatives of each other in imaginary part
    expect(result.im).toBeCloseTo(-result2.im, 10);
    // More specifically, for acot(0 + tiny*i) with tiny>0:
    // Original gives atan(0, -Inf) which has negative im
    // Mutated gives atan(0, +Inf) which has positive im
    expect(result.im).toBeLessThan(0);
  });
});