import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex with null", () => {
  it("should handle null input and produce zero with correct im via chained assignment", () => {
    // The mutation changes z['im']=0 to z[""]=0 in the chained assignment
    // If z['im'] is NOT set by the chain, and the subsequent z['im']=0 is inside else-if,
    // then null input would leave im undefined/NaN
    const c = new Complex(null);
    expect(isNaN(c.im)).toBe(false);
    expect(c.im).toBe(0);
    expect(c.re).toBe(0);
  });
});