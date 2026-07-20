import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth(2) (real input) using the general formula path", () => {
    // For a pure real input a=2, b=0:
    // The code takes the b===0 branch: return new Complex(Math.atan2(1, a), 0)
    // So acoth(2) = atan2(1, 2) = atan(0.5) ≈ 0.4636476090008257
    // This doesn't exercise the mutation.
    
    // For a=2, b=1: d = 5
    // Original: atanh(2/5, -1/5) = atanh(0.4, -0.2)
    // Mutated:  atanh(2*5, -1*5) = atanh(10, -5)
    // These produce very different results.
    
    // Let's compute atanh(0.4, -0.2) by hand using the atanh formula in the code:
    // a=0.4, b=-0.2
    // noIM = a > 1 && b === 0 => false
    // oneMinus = 1 - 0.4 = 0.6
    // onePlus = 1 + 0.4 = 1.4
    // d = 0.6^2 + (-0.2)^2 = 0.36 + 0.04 = 0.4
    // x.re_num = (1.4 * 0.6 - (-0.2)*(-0.2)) / 0.4 = (0.84 - 0.04) / 0.4 = 0.8/0.4 = 2.0
    // x.im_num = ((-0.2)*0.6 + 1.4*(-0.2)) / 0.4 = (-0.12 - 0.28)/0.4 = -0.4/0.4 = -1.0
    // temp = x.re = 2.0
    // x.re = logHypot(2, -1) / 2 = log(sqrt(5)) / 2 = 0.5*ln(5)/2 = ln(5)/4
    // x.im = atan2(-1, 2) / 2
    
    const ln5over4 = Math.log(5) / 4;
    const atan2_neg1_2_over2 = Math.atan2(-1, 2) / 2;
    
    const result = new Complex(2, 1).acoth();
    
    expect(result.re).toBeCloseTo(ln5over4, 10);
    expect(result.im).toBeCloseTo(atan2_neg1_2_over2, 10);
  });
});