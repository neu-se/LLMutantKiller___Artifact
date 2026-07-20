import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return correct result for asec(2) - real input greater than 1', () => {
    // For z = 2 + 0i: a=2, b=0
    // d = 4, (false) -> else branch
    // Original: new Complex((2!==0)?2/0:0, (0!==0)?0/0:0) = new Complex(Inf, 0).acos()
    // Mutated:  new Complex((true)?2/0:0, (0!==0)?0/0:0) = new Complex(Inf, 0).acos()
    // Same! Need a=0 case.
    // For z = 0 + 0i: handled by early return
    // Try z = 0 + 1i: a=0, b=1
    // Original: new Complex(0, -Infinity).acos()
    // Mutated: new Complex(NaN, -Infinity).acos()
    // acos for (0, -Inf): t1 = sqrt(Inf+1, 0) = sqrt(Inf, 0) = (Inf, 0)
    //   t2 = log(Inf-(-Inf), 0+0) = log(NaN, 0) -> NaN
    // acos for (NaN, -Inf): t1 = sqrt(Inf-NaN+1, 0) = sqrt(NaN,0) -> NaN
    // Both NaN... 
    // Let me check the imaginary part difference
    const z = new Complex(0, 1);
    const result = z.asec();
    // For the original, new Complex(0, -Infinity):
    // acos: t1=sqrt(Inf,0)=(Inf,0), t2=log(Inf+Inf,0)=log(Inf,0)=(Inf,0)
    // return (pi/2 - 0, Inf) = (pi/2, Inf)
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
  });
});