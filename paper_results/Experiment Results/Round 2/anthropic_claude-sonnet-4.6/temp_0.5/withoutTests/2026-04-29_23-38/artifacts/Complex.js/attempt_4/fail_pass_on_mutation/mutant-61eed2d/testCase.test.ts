import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should not have an empty string property on parsed complex number", () => {
    const c = new Complex("3+2i");
    // In mutated code, z[""] = 0 gets set, but it's on the local z object, not on c
    // So this won't work either...
    // Let me try: does re get set correctly?
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
    // The mutated code sets z[""] = z['re'] = 0, resetting re to 0 AFTER it was set to 0
    // but BEFORE parsing. So re should still accumulate correctly.
    // I'm stuck - let me try a negative test
    expect(Object.prototype.hasOwnProperty.call(c, '')).toBe(false);
  });
});