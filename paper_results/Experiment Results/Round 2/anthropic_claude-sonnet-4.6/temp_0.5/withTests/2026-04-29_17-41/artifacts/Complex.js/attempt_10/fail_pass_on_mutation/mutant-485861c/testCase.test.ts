import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex construction from null followed by re assignment", () => {
  it("should correctly construct from null and have re=0 detectable via log", () => {
    const c = new Complex(null);
    // log(0 + 0i) should give -Infinity for re part
    const logged = c.log();
    expect(logged.re).toBe(-Infinity);
    expect(logged.im).toBe(0);
  });
});