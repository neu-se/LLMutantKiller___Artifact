import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc with subnormal imaginary part produces consistent NaN behavior", () => {
    // With a=0, b=1e-200: d underflows to 0, else branch taken
    // Original: Complex(0, -Infinity).asin() -> NaN (0*Inf = NaN in sin formula)  
    // Mutated: Complex(NaN, -Infinity).asin() -> NaN
    // Both NaN - mutation undetectable here
    // 
    // BUT: check the imaginary part difference!
    // Original: new Complex(0, -Infinity).asin()
    //   im = cos(0)*sinh(-Inf) = 1*(-Inf) = -Infinity
    //   re = sin(0)*cosh(-Inf) = 0*Inf = NaN
    // Mutated: new Complex(NaN, -Infinity).asin()  
    //   im = cos(NaN)*sinh(-Inf) = NaN*(-Inf) = NaN
    //   re = sin(NaN)*cosh(-Inf) = NaN*Inf = NaN
    // So imaginary part differs: -Infinity vs NaN!
    const result = new Complex(0, 1e-200).acsc();
    expect(result.im).toBe(-Infinity);
  });
});