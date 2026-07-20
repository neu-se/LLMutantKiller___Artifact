import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should produce different result for asech with subnormal a causing d=0", () => {
    // Number.MIN_VALUE * Number.MIN_VALUE === 0 in IEEE 754
    // So d = a*a + b*b = 0, but isZero() is false since a !== 0
    // Original: new Complex(a/0, 0).acosh() = new Complex(Infinity, 0).acosh()
    // Mutated:  new Complex(a*0, 0).acosh() = new Complex(0, 0).acosh()
    const a = Number.MIN_VALUE;
    const z = new Complex(a, 0);
    const result = z.asech();
    
    // acosh(Infinity) should give Infinity
    // acosh(0) gives pi/2 * i (purely imaginary)
    // So re part should differ: original gives Infinity, mutated gives ~0
    expect(result.re).toBe(Infinity);
  });
});