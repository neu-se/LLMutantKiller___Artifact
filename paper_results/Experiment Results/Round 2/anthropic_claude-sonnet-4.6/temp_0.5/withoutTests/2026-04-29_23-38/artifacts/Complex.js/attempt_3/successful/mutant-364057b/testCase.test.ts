import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should not produce NaN in asech d===0 branch when a is 0", () => {
    const c = new Complex(1, 0);
    c['re'] = 0;
    c['im'] = 0;
    c['isZero'] = () => false;
    const result = c.asech();
    // Original: (a !== 0) ? a/0 : 0 => a=0 => 0, then acosh(0 + i*0) => finite
    // Mutated:  (a === 0) ? a/0 : 0 => a=0 => 0/0 = NaN, then acosh(NaN + i*0) => NaN
    expect(result.isNaN()).toBe(false);
  });
});