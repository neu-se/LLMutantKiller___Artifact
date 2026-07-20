import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation detection", () => {
  it("should return Infinity imaginary part for acot(0 + bi) when d=0 edge case via NaN path", () => {
    // The mutation changes (b !== 0) ? -b / 0 : 0 to (false) ? -b / 0 : 0
    // We need to reach the d===0 else branch with b !== 0
    // If we pass a=0, b=NaN: d = 0 + NaN*NaN = NaN, so d !== 0 is true (NaN !== 0 is true)
    // If we pass a=NaN, b=0: b===0 returns early
    // What about a=0, b=Infinity? d = 0 + Infinity = Infinity, d !== 0 is true
    // 
    // The only way to get d===0 with b!==0 is impossible with real arithmetic.
    // BUT: we can test the acot of a complex number constructed to have re=0, im=nonzero
    // and verify the result has the correct infinite imaginary part by checking the
    // behavior when the complex number has re=0, im=b where b*b overflows to Infinity
    // making d=Infinity... still not 0.
    //
    // Let's try: what if we manually set re and im after construction?
    // The mutation only matters if b !== 0 when d === 0.
    // Since d = a^2 + b^2 = 0 requires a=b=0, but b===0 check exits early,
    // the else branch with b!==0 seems unreachable.
    //
    // HOWEVER: what if a=0 and b is very small such that b*b underflows to 0?
    // Then d = 0 + 0 = 0, but b !== 0!
    const tinyB = 5e-324; // smallest positive double (denormalized)
    const z = new Complex(0, tinyB);
    const result = z.acot();
    // Original: d = 0 + (5e-324)^2 = 0 (underflow), b !== 0 is true
    //   imaginary part = -b/0 = -Infinity, then .atan() is called on (0, -Infinity)
    // Mutated: d = 0, false ? ... : 0, imaginary part = 0, then .atan() on (0, 0)
    // So original gives acot result with Infinity involved, mutated gives acot(0)=pi/2
    expect(result.re).not.toBeCloseTo(Math.PI / 2, 5);
  });
});