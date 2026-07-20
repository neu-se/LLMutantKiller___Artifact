import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh branch condition by checking sign of imaginary part for input in (0,1)", () => {
    // For real x in (0,1): acosh(x) = i*acos(x), so im should be positive acos(x)
    // The mutation changes im<=0 to im<0, affecting the case when acos result has im===0
    // For x=0.5: acos(0.5).im = logHypot(sqrt(0.75), 0.5) > 0
    // So acos(0.5).im > 0, meaning res['im'] > 0 in both branches -> second branch taken in both
    // Need input where acos gives im===0 exactly
    // acos(x) for real x: im = logHypot(t1.re - b, t1.im + a) where b=0
    // im of acos = logHypot(t1.re, a) = 0 only if t1.re^2 + a^2 = 1
    // t1 = sqrt(1-a^2, 0) = (sqrt(1-a^2), 0) for 0<a<1
    // So logHypot(sqrt(1-a^2), a) = log(sqrt((1-a^2)+a^2))/... = log(1)*0.5 = 0!
    // So for ANY real x in (0,1), acos(x).im = 0 exactly!
    // Original: im<=0 -> true -> re=-im=0, im=re=PI/2-atan2(a, sqrt(1-a^2)) = acos(a) > 0
    // Mutated: im<0 -> false -> re=im=0, im=-re=-(PI/2-atan2(a,sqrt(1-a^2))) = -acos(a) < 0
    const result = new Complex(0.5, 0).acosh();
    expect(result.im).toBeGreaterThan(0);
  });
});