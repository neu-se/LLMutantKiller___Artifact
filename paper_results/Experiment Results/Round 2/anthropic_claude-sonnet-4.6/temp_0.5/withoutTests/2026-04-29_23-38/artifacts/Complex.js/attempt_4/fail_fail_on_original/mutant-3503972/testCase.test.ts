import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects sign mutation in acsch d=0 branch with underflow", () => {
    // Use subnormal numbers where a*a and b*b both underflow to 0
    // but a=0 and b=MIN_VALUE so only b contributes
    // Actually let's try a=MIN_VALUE, b=MIN_VALUE
    // d = MIN_VALUE^2 + MIN_VALUE^2 = 0 + 0 = 0
    // a !== 0, b !== 0
    // Original: new Complex(a/0=+Inf, -b/0=-Inf).asinh()
    // Mutated:  new Complex(a/0=+Inf, +b/0=+Inf).asinh()
    const tiny = Number.MIN_VALUE;
    const z = new Complex(tiny, tiny);
    const result = z.acsch();
    // asinh(+Inf - Inf*i) vs asinh(+Inf + Inf*i)
    // These might differ in sign of imaginary part
    // Let's check what the original gives
    const ref = new Complex(Infinity, -Infinity);
    const refResult = ref.asinh();
    expect(result.im).toBeCloseTo(refResult.im, 5);
  });
});