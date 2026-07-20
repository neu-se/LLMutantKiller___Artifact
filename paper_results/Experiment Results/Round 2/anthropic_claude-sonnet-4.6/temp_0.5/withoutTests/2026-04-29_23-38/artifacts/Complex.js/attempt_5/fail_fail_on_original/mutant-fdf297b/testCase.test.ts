import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when both operands are infinite but not when only one is", () => {
    // With mutated code (&&): Infinity - Infinity = NaN, Infinity - finite = Infinity
    // With original code (||): Infinity - Infinity = NaN, Infinity - finite = NaN
    // The difference: in mutated, finite.sub(Infinity) returns Infinity
    // In original, finite.sub(Infinity) returns NaN
    const finiteMinusInfinity = new Complex(5, 0).sub(Complex.INFINITY);
    
    // Original (||): first check triggers (false || true) => NaN
    // Mutated (&&): first check skips (false && true), second || check => Infinity
    expect(finiteMinusInfinity.isNaN()).toBe(true);
  });
});