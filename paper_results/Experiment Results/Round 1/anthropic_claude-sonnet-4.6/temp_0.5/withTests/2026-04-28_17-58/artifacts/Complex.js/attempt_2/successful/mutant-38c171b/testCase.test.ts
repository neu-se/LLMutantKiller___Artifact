import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch with subnormal imaginary part", () => {
  it("should compute acsch for purely imaginary number with extremely small magnitude where b*b underflows to 0", () => {
    // b = Number.MIN_VALUE, a = 0
    // d = a*a + b*b = 0 + 0 = 0 (underflow)
    // b !== 0 is true, so original returns -b/0 = -Infinity for im part
    // mutated returns 0 for im part
    const b = Number.MIN_VALUE;
    const z = new Complex(0, b);
    const result = z.acsch();
    // Original: im part = -b/0 = -Infinity, then asinh of complex with -Infinity im
    // The imaginary part of the input to asinh would be -Infinity
    // asinh(0 - i*Infinity) should have a non-zero/non-finite imaginary component
    expect(result.im).not.toBe(0);
  });
});