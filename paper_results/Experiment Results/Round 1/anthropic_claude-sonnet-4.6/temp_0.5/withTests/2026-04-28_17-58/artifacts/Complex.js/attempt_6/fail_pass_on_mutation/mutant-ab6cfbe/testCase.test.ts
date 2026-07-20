import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("pow using log internally with zero base imaginary part", () => {
    // pow(2+0i, 0.5) uses log internally
    // log(2, 0): a=2>0, b=0
    // Original: enters if (if return uncommented), returns Complex(Math.log(2), 0)
    // Mutated: same since 2>=0 also true
    // Need a=0 case... try Complex(0,1).pow(2)
    // pow(0+i, 2): a=0, b=1, z.re=2, z.im=0
    // Not zero base, uses log path
    // arg = atan2(1, 0) = PI/2
    // loh = logHypot(0, 1) = log(1)*0.5 = 0
    // result = exp(2*0)*cos(2*PI/2) = cos(PI) = -1, sin(PI) = 0
    const result = new Complex(0, 1).pow(2);
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});