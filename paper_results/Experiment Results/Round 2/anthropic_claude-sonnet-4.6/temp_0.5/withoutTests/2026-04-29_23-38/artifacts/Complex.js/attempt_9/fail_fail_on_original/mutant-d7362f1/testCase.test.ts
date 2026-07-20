import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should return Infinity real part when multiplying two infinite real numbers via optimization", () => {
    // When both numbers have im=0 and re=Infinity:
    // Original optimization: new Complex(Infinity * Infinity, 0) = new Complex(Infinity, 0)
    // Mutated general formula: 
    //   re = Infinity*Infinity - 0*0 = Infinity
    //   im = Infinity*0 + 0*Infinity = NaN (Infinity * 0 = NaN in IEEE 754!)
    //
    // THIS IS THE KEY DIFFERENCE!
    // Infinity * 0 = NaN in IEEE 754
    // So im = Infinity*0 + 0*Infinity = NaN + NaN = NaN
    //
    // Original: new Complex(Infinity, 0) -> im is 0
    // Mutated: new Complex(Infinity, NaN) -> im is NaN!
    
    const a = new Complex(Infinity, 0);
    const b = new Complex(Infinity, 0);
    const result = a.mul(b);
    
    // Original: takes optimization path, returns new Complex(Infinity, 0)
    // Mutated: uses general formula, im = Infinity*0 + 0*Infinity = NaN
    expect(result.im).toBe(0);
    expect(isNaN(result.im)).toBe(false);
  });
});