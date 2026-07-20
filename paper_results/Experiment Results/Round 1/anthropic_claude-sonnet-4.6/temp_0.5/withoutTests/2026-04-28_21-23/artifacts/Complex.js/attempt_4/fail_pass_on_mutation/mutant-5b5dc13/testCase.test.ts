import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with subnormal b where b*b underflows: a=0 case", () => {
    // Force d=0 fallback: a=0, b=Number.MIN_VALUE (b*b underflows to 0)
    // Original: (0 !== 0) ? 0/0 : 0 = 0 => Complex(0, -Infinity).asinh()
    // Mutated:  (0 === 0) ? 0/0 : 0 = NaN => Complex(NaN, -Infinity).asinh()
    // Both give NaN... 
    const result = new Complex(0, Number.MIN_VALUE).acsch();
    expect(result.isNaN()).toBe(true);
  });
});