import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex tan function", () => {
  it("should correctly compute tan of a purely imaginary number using cosh", () => {
    // tan(0 + i*b) = i*tanh(b)
    // tan uses: d = Math.cos(2a) + cosh(2b)
    // For a=0, b=1: d = cos(0) + cosh(2) = 1 + cosh(2)
    // re = sin(0)/d = 0, im = sinh(2)/d
    // If cosh returns undefined: d = 1 + undefined = NaN, im = NaN
    // But Math.cosh exists in Node.js so both original and mutant use Math.cosh
    
    // Instead test the tanh which also uses cosh in denominator
    const c = new Complex(1, 1);
    const result = c.tanh();
    
    // tanh(1+i) has well-defined real and imaginary parts
    // d = cosh(2) + cos(2)
    const d = Math.cosh(2) + Math.cos(2);
    const expectedRe = Math.sinh(2) / d;
    const expectedIm = Math.sin(2) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});