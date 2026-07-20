import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("handles subnormal imaginary part where d underflows to zero", () => {
    // b = smallest positive float (subnormal), b*b underflows to 0
    // a = 0, so d = 0*0 + b*b = 0, but b !== 0
    // Original: (b !== 0) ? -b/0 : 0 → b !== 0 is true → -b/0 = -Infinity
    // Mutated:  (b === 0) ? -b/0 : 0 → b === 0 is false → 0
    // Then .asinh() is called on new Complex(0, -Infinity) vs new Complex(0, 0)
    const b = 5e-324; // smallest positive subnormal float
    const result = new Complex(0, b).acsch();
    // Original produces new Complex(0, -Infinity).asinh()
    // Mutated produces new Complex(0, 0).asinh() = Complex(0, 0)
    // new Complex(0, -Infinity).asinh() should give a different result
    const originalExpected = new Complex(0, -Infinity).asinh();
    expect(result.re).toBeCloseTo(originalExpected.re, 5);
    expect(result.im).toBeCloseTo(originalExpected.im, 5);
  });
});