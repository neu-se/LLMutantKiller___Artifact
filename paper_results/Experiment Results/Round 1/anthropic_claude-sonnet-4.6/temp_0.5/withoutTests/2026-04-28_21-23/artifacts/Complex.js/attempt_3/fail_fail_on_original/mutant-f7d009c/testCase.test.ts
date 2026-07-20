import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs hypot boundary", () => {
  it("uses stable formula when imaginary part is exactly 3000 and real part is 2000", () => {
    const c = new Complex(2000, 3000);
    const stableResult = 3000 * Math.sqrt(1 + (2000 / 3000) * (2000 / 3000));
    const simpleResult = Math.sqrt(2000 * 2000 + 3000 * 3000);
    // 2000/3000 = 2/3 is not exactly representable, so these should differ
    expect(stableResult).not.toBe(simpleResult); // verify test validity
    expect(c.abs()).toBe(stableResult);
  });
});