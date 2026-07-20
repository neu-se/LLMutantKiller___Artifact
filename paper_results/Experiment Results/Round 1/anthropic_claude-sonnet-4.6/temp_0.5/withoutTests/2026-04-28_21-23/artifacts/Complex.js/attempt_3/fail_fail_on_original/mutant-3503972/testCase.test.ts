import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch with correct imaginary sign when d underflows to zero with positive tiny imaginary", () => {
    // Number.MIN_VALUE squared underflows to 0 in IEEE 754
    const tiny = Number.MIN_VALUE; // 5e-324, b !== 0 but b*b === 0
    const z = new Complex(0, tiny);
    
    // Verify the underflow actually happens
    expect(tiny * tiny).toBe(0);
    expect(tiny).not.toBe(0);
    
    // Original: d=0, b>0 => imaginary part = -b/0 = -Infinity => asinh(0 + (-Inf)i)
    // Mutated:  d=0, b>0 => imaginary part = +b/0 = +Infinity => asinh(0 + (+Inf)i)
    //
    // asinh(0 - Inf*i): swaps to Complex(-Inf, 0), calls asin
    // asin(-Inf + 0i): t1 = sqrt(0 - Inf^2 + 1, 0) = sqrt(-Inf, 0)
    //   sqrt with a<0: re = |b|/sqrt(2*(r-a)) = 0/sqrt(2*(Inf+Inf)) = 0
    //                  im = 0.5*sqrt(2*(r-a)) = 0.5*sqrt(Inf) = Inf
    //   t1 = Complex(0, Inf)
    // t2 = Complex(t1.re - b, t1.im + a).log() = Complex(0-0, Inf+(-Inf)).log() = Complex(0, NaN).log()
    // Hmm, this gets NaN...
    
    // Let me just check the actual sign of re vs im of the result
    const result = z.acsch();
    
    // For original: should get a result with negative imaginary part (approaching -pi/2)
    // For mutated: should get a result with positive imaginary part
    // Actually let me verify by computing acsch(0 + epsilon*i) analytically:
    // acsch(bi) = asinh(1/(bi)) = asinh(-i/b) 
    // For small b>0: -i/b is large negative imaginary
    // asinh(-i*M) for large M ≈ -i*pi/2
    // So im should be negative
    
    expect(result.im).toBeLessThan(0);
  });
});