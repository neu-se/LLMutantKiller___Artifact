import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return Infinity real part for subnormal input where d underflows to zero", () => {
    // Number.MIN_VALUE^2 underflows to 0, so d=0 while a=Number.MIN_VALUE != 0
    // Original: fallback uses a/0 = Infinity => Complex(Infinity, 0).acosh() => re=Infinity
    // Mutated:  fallback uses a*0 = 0       => Complex(0, 0).acosh()       => re=0
    const result = new Complex(Number.MIN_VALUE, 0).asech();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});