import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("detects mutation: acsch(-0 - tiny*i) differs between original and mutated", () => {
    const tiny = 5e-324;
    expect(tiny * tiny).toBe(0);
    expect(tiny).not.toBe(0);
    
    // a = -0, b = -tiny
    // b === 0 is false (tiny !== 0)
    // d = (-0)^2 + tiny^2 = 0 + 0 = 0 (underflow)
    // d !== 0 is false → else branch
    // Original: ((-0) !== 0) = false → 0; second: (-tiny !== 0) → tiny/0 = Infinity
    //   → Complex(0, Infinity).asinh() = Complex(Infinity, PI/2)
    // Mutated:  ((-0) === 0) = true → (-0)/0 = NaN; second: Infinity
    //   → Complex(NaN, Infinity).asinh() = NaN
    const result = new Complex(-0, -tiny).acsch();
    expect(result.isNaN()).toBe(false);
  });
});