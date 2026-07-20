import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null input handling", () => {
  it("should return a complex number with re=0 and im=0 when null is passed, and the re property should be accessible", () => {
    const c = new Complex(null as any);
    // In the mutated code, z[""] = z['im'] = 0 sets z[""] not z['re']
    // However z['re'] starts at 0 anyway, so we need to check the "" property isn't leaking
    // The real difference: in mutated code z[""] gets set, meaning the object has an extra "" key
    // We can detect this by checking that the parse result doesn't have a "" property
    // But Complex constructor only copies re and im...
    // Let's verify re is 0 by doing arithmetic that would expose if re was undefined/NaN
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.add(1).re).toBe(1);
  });
});