import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot with subnormal inputs", () => {
  it("should compute acot correctly when a and b are so small that a*a+b*b underflows to 0", () => {
    const tiny = Number.MIN_VALUE; // ~5e-324, squares underflow to 0
    // a = tiny, b = tiny
    // b !== 0, so no early return
    // d = tiny*tiny + tiny*tiny = 0 + 0 = 0 (underflow)
    // d === 0, so enters else branch
    // re: (a !== 0) ? a/0 : 0 = Infinity
    // im (original): (b !== 0) ? -b/0 : 0 = -Infinity
    // im (mutated):  (b !== 0) ? +b/0 : 0 = +Infinity
    // Then atan(Infinity + i*(-Infinity)) vs atan(Infinity + i*(+Infinity))
    
    const result = new Complex(tiny, tiny).acot();
    const resultNeg = new Complex(tiny, -tiny).acot();
    
    // For original: atan(Inf - i*Inf)
    // For mutated:  atan(Inf + i*Inf)
    // These should give different imaginary parts
    
    // The imaginary parts should have opposite signs between original and mutated
    // Original result.im should be negative (since -b/0 = -Inf for b>0)
    // Mutated result.im would be positive
    expect(result.im).toBeLessThan(0);
  });
});