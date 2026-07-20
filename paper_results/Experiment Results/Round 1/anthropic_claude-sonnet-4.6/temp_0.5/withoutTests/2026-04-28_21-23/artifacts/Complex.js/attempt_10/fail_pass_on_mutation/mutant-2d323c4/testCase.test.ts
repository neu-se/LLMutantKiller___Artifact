import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with negative real part and subnormal imaginary part", () => {
    // a = -Number.MIN_VALUE, b = Number.MIN_VALUE
    // d = a*a + b*b = 0 + 0 = 0 (both underflow)
    // else: Complex((-MIN)/(0), -(MIN)/(0)) = Complex(-Inf, -Inf)
    // if:  Complex((-MIN)/0, -(MIN)/0) = Complex(-Inf, -Inf)  
    // Still same... need a=0 case
    // Try: a=0, b=-Number.MIN_VALUE
    // else: Complex(0, -(-MIN)/0) = Complex(0, MIN/0) = Complex(0, +Inf)
    // if:  Complex(0/0, MIN/0) = Complex(NaN, +Inf)
    const z = new Complex(0, -Number.MIN_VALUE);
    const result = z.acsch();
    const fromElse = new Complex(0, Infinity).asinh();
    expect(result.re).toBe(fromElse.re);
    expect(result.im).toBe(fromElse.im);
  });
});