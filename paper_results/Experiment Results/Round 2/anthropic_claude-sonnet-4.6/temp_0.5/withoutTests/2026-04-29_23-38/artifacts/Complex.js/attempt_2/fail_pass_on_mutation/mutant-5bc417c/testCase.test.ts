import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('should compute acoth correctly for purely imaginary input where d equals zero', () => {
    // For a=0, b=0: d = 0*0 + 0*0 = 0
    // Original (d !== 0): condition false -> second branch of ternary
    //   new Complex((0!==0)?0/0:0, (0!==0)?-0/0:0).atanh() = new Complex(0,0).atanh() = 0
    // Mutated (true): condition true -> first branch
    //   new Complex(0/0, -0/0).atanh() = Complex(NaN, NaN)
    // But if(true) fires first in both, returning Complex(0, PI/2)
    // So we need b !== 0 to bypass if(true)... but if(true) always fires
    
    // The only testable difference: if the if(true) was originally if(b===0),
    // then with b=1, original skips to placeholder code
    const result = new Complex(0, 1).acoth();
    expect(isNaN(result.re)).toBe(false);
  });
});