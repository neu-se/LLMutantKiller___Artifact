import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return Infinity real part when asech is called with extremely small real value causing d=0", () => {
    // Use the smallest positive subnormal number so that a*a underflows to 0
    // This makes d = a*a + b*b = 0, but isZero() is false since a !== 0
    // Original: uses a/0 = Infinity; Mutated: uses a*0 = 0
    const a = 5e-324; // smallest positive subnormal: a*a === 0 in IEEE 754
    const z = new Complex(a, 0);
    const result = z.asech();
    // In original code, this hits the d===0 branch with a!==0, so a/0 = Infinity
    // acosh(Infinity + 0i) should give Infinity
    expect(result.isInfinite()).toBe(true);
  });
});