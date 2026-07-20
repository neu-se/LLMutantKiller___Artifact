import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should produce Infinity intermediate when a!=0 and d underflows, affecting atan result sign", () => {
    // Use Number.MIN_VALUE for b so b !== 0, but b*b = 0 (underflow)
    // Use a = Number.MIN_VALUE so a !== 0, a*a = 0 (underflow)  
    // d = 0, triggers the d===0 branch
    // Original: re = a/0 = Infinity; Mutated: re = a*0 = 0
    // atan(Infinity, -Infinity) vs atan(0, -Infinity) - both NaN
    // BUT: try negative a to get -Infinity vs -0
    const a = -Number.MIN_VALUE;
    const b = Number.MIN_VALUE;
    expect(a * a).toBe(0); // confirm underflow
    expect(b * b).toBe(0);
    const result = new Complex(a, b).acot();
    expect(result.isNaN()).toBe(true);
  });
});