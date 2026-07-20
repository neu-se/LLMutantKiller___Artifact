import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a complex number with only imaginary part, using +b/d sign (not -b/d)", () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (true) ? a / 0 : 0
    // in the d===0 fallback of acsc. To reach d===0 branch while bypassing
    // the early return (a===0 && b===0), we need d=0 with a=0,b=0 - but
    // that's caught. However, we can detect the mutation by checking
    // acsc with a=0 which goes through the d!==0 branch:
    // new Complex(0/d, +b/d).asin() where d = b*b
    // For acsc(2i): a=0, b=2, d=4 => new Complex(0, 0.5).asin()
    const result = new Complex(0, 2).acsc();
    
    // Manually: acsc(2i) = asin(1/(2i)) = asin(-i/2)
    // asin(-i/2): a=0, b=-0.5
    // t1 = sqrt(1 - 0 + 0.25, 0) = sqrt(1.25, 0) = (sqrt(1.25), 0)
    // t2 = log(sqrt(1.25), -0.5) 
    // result re = t2.im, im = -t2.re
    const inner = new Complex(0, -0.5).asin();
    expect(result.re).toBeCloseTo(inner.re, 10);
    expect(result.im).toBeCloseTo(inner.im, 10);
    
    // More importantly: verify the sign of imaginary part in acsc(0+2i)
    // acsc uses +b/d (not -b/d) for imaginary part
    // The result should have a specific imaginary sign
    expect(result.im).toBeGreaterThan(0);
    
    // Now force the d===0 path: pass NaN to make d=NaN, skip early return
    // Actually test with a=0, b=0 to confirm early return still gives PI/2, Inf
    const zero = new Complex(0, 0).acsc();
    expect(zero.re).toBeCloseTo(Math.PI / 2, 10);
    expect(zero.im).toBe(Infinity);
    
    // The key test: with a very small number that rounds to 0 in d but a!=0
    // Use Number.MIN_VALUE: a=Number.MIN_VALUE, b=0
    // d = a*a + 0 = 0 (underflows to 0!)
    // early return: a!==0, so no early return
    // d===0 branch: original: (a!==0)?a/0:0 = Infinity; mutated: (true)?a/0:0 = Infinity
    // Both give Infinity... same result
    
    // Try a=0, b=Number.MIN_VALUE: d underflows to 0
    // early return: b!==0, so no early return  
    // d===0 branch: original: (a!==0)?a/0:0 = (false)?...:0 = 0
    //               mutated:  (true)?a/0:0 = 0/0 = NaN
    const tiny = new Complex(0, Number.MIN_VALUE).acsc();
    expect(tiny.isNaN()).toBe(false);
  });
});