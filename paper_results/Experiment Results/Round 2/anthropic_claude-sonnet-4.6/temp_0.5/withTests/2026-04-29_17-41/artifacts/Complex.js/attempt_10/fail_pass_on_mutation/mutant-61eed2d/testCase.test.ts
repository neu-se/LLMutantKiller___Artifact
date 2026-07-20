import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should have re equal to 0 when parsing pure imaginary string", () => {
    // In mutated code z[""] = z['re'] = 0 still sets z['re'] = 0
    // But what if the chain evaluation order causes z['re'] to not be reset?
    // Testing with a string that previously had re set differently
    const c1 = new Complex("5+3i"); // sets re=5
    const c2 = new Complex("2i");   // should have re=0
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(2);
    // The key: re must be exactly 0, not 5 from previous parse
    expect(c2.re).not.toBe(5);
  });
});