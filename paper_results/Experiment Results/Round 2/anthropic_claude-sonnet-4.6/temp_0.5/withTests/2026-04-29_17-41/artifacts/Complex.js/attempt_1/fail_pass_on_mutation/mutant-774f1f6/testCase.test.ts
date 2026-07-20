import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null/undefined handling", () => {
  it("should return a complex number with re=0 and im=0 when passed null", () => {
    // The mutation changes z['re'] = to z[""] = 
    // This means when null is passed, instead of setting re to 0, it sets an empty string property
    // So re would remain undefined/0 from prototype but the assignment is lost
    const c = new Complex(null as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});