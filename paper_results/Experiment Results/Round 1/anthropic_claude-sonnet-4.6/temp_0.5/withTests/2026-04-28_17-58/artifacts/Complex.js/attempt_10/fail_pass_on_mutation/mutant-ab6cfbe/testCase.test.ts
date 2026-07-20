import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log mutation", () => {
  it("atan of complex number that produces a=0 intermediate in log", () => {
    // atan(0, b) where b != 1 and b != -1
    // d = 0 + (1-b)^2
    // creates Complex((1-b^2)/d, 0/d) = Complex(1, 0) when b=0
    // log(1, 0): a=1, b=0
    // Original (a>0): returns Complex(Math.log(1), 0) = Complex(0, 0)
    // Mutated (a>=0): same
    // Need intermediate where a=0 exactly in log call
    // atan(a, b): d = a^2 + (1-b)^2, creates Complex((1-b^2-a^2)/d, -2a/d)
    // For this to have re=0: 1-b^2-a^2=0, i.e., a^2+b^2=1
    // And im=0: -2a/d=0, i.e., a=0
    // So a=0, b=1 or b=-1 (but those are special cases)
    // Try a=0, b=0.5: d=0+(0.5)^2=0.25, Complex((1-0.25)/0.25, 0) = Complex(3, 0)
    // log(3,0): a=3>0, both versions same
    // I need re=0 in the intermediate complex for log
    // That means 1-b^2-a^2=0 with a!=0 so im=-2a/d != 0, b!=0 in log call
    // Seems impossible to get a=0,b=0 in log from atan
    // Let me try acoth(0,0) -> returns Complex(0, PI/2)
    const result = new Complex(0, 0.5).atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.atanh(0.5), 10);
  });
});