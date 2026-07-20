import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch mutation detection', () => {
  it('should correctly compute acsch for a complex number with non-zero imaginary part', () => {
    // For z = i (purely imaginary, a=0, b=1)
    // Original code: b !== 0, so uses asinh path
    //   d = 0*0 + 1*1 = 1
    //   returns new Complex(0/1, -1/1).asinh() = new Complex(0, -1).asinh()
    //   asinh(0 - i) = -i * pi/2 approximately
    // Mutated code: if(true) always takes simplified path
    //   returns new Complex(Infinity, 0) since a=0 => Math.log(0 + sqrt(0+1)) but a===0 returns Infinity
    
    // Use z = 2 + 1i to get a clear difference
    const z = new Complex(2, 1);
    const result = z.acsch();
    
    // The correct result for acsch(2+i):
    // Using the formula: acsch(z) = asinh(1/z)
    // 1/(2+i) = (2-i)/(4+1) = (2/5) - (1/5)i
    // asinh(0.4 - 0.2i) should give a specific complex value
    
    // With mutation (if true), it would compute:
    // Math.log(2 + Math.sqrt(4+1)) = Math.log(2 + sqrt(5)) ≈ Math.log(4.236) ≈ 1.4427
    // So result would be approximately Complex(1.4427, 0)
    
    // With original code (b !== 0 path):
    // d = 4 + 1 = 5, returns (2/5, -1/5).asinh() = (0.4, -0.2).asinh()
    // This should have a non-zero imaginary part
    
    // The imaginary part should be non-zero for the correct result
    expect(result.im).not.toBeCloseTo(0, 5);
  });
});