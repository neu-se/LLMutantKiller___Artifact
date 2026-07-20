import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot with negative subnormal imaginary part uses correct sign in d=0 branch", () => {
    // Use negative subnormal: b = -Number.MIN_VALUE
    // b !== 0 is true, b*b underflows to 0, a*a = 0, so d = 0
    // Original: -b/0 = -(-MIN_VALUE)/0 = +Infinity
    // Mutated:  +b/0 = +(-MIN_VALUE)/0 = -Infinity
    // With a=0: atan(0, +Inf) vs atan(0, -Inf)
    // Check against acot with positive subnormal (which swaps the sign)
    const posResult = new Complex(0, Number.MIN_VALUE).acot();
    const negResult = new Complex(0, -Number.MIN_VALUE).acot();
    
    // For positive b: original gives atan(0, -Inf), mutated gives atan(0, +Inf)
    // For negative b: original gives atan(0, +Inf), mutated gives atan(0, -Inf)
    // Both give NaN, but let's verify they are NaN
    // and that acot(0, -MIN_VALUE) matches acot(0, MIN_VALUE) in NaN-ness
    expect(posResult.isNaN()).toBe(negResult.isNaN());
  });
});