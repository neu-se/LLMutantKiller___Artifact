import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch where tmp assignment is replaced", () => {
    // For acosh(-2), acos(-2).im > 0 so else branch is taken
    // Original: tmp = res['im'], res['im'] = -res['re'], res['re'] = tmp (correct swap)
    // Mutated: res['im'] = -res[""] (NaN), res['im'] = -res['re'], res['re'] = tmp (undefined)
    // So in mutated code res['re'] = undefined
    const result = new Complex(-2, 0).acosh();
    expect(result.re).not.toBeUndefined();
    expect(typeof result.re).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
  });
});