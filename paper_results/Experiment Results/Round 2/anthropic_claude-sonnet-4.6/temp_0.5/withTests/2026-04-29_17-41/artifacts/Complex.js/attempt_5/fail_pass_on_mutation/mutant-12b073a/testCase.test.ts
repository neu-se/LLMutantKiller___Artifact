import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("sinh mutation detection", () => {
  it("Complex.tan of purely imaginary number detects wrong sinh scaling", () => {
    // tan(ib) = i*tanh(b)
    // tan uses: sinh(2b)/d where d = cos(0) + cosh(2b) = 1 + cosh(2b)
    // If sinh is wrong by factor 4, result will differ
    // tanh(2) = sinh(2)/cosh(2) but in tan formula:
    // tan(0 + 1i): a=0, b=1, 2a=0, 2b=2
    // re = sin(0)/d = 0
    // im = sinh(2)/d where d = cos(0) + cosh(2) = 1 + cosh(2)
    // = sinh(2)/(1+cosh(2)) = tanh(1) 
    // If sinh*4: im = 4*sinh(2)/(1+cosh(2)) = 4*tanh(1)
    const c = new Complex(0, 1);
    const result = c.tan();
    const expected = Math.tanh(1);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected, 10);
  });
});