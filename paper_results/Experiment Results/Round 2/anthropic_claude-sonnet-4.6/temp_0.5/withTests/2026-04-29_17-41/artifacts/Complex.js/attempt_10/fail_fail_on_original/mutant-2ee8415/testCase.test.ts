import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch by checking a case where acos returns positive im", () => {
    // Find input where acos returns im > 0 by checking acos directly
    // acos(a,b) returns (PI/2 - t2.im, t2.re)
    // t2.re = logHypot(t1.re - b, t1.im + a)
    // For input (-1, -1): t1 = sqrt(1-1+1, 2) = sqrt(1, 2)
    // t1.re = sqrt((sqrt(5)+1)/2), t1.im = sqrt((sqrt(5)-1)/2)  
    // Need t2.re > 0 which means logHypot > 0 meaning hypot > 1
    const acosResult = new Complex(-1, -1).acos();
    const result = new Complex(-1, -1).acosh();
    
    // In original: if im<=0: re=-im, im=tmp(old re); else: re=im, im=-old_re
    if (acosResult.im <= 0) {
      expect(result.re).toBeCloseTo(-acosResult.im, 10);
      expect(result.im).toBeCloseTo(acosResult.re, 10);
    } else {
      expect(result.re).toBeCloseTo(acosResult.im, 10);
      expect(result.im).toBeCloseTo(-acosResult.re, 10);
    }
    // Wolfram: acosh(-1-i) ≈ 1.0612 - 1.8695i
    expect(result.re).toBeCloseTo(1.06127506190503565, 5);
    expect(result.im).toBeCloseTo(-1.86942966442945497, 5);
  });
});