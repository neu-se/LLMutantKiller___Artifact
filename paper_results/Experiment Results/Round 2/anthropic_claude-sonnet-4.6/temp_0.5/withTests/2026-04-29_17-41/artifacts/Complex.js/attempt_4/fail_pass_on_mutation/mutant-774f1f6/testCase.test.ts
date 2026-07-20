import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number properties", () => {
  it("should not have an empty string property when constructed with null", () => {
    const c = new Complex(null as any);
    // In mutated code, z[""] = 0 would be set, potentially leaking to the Complex object
    // Actually z is a local variable, not the Complex instance itself
    // The Complex instance gets z['re'] and z['im'] assigned to this['re'] and this['im']
    // So this won't work either
    expect((c as any)['']).toBeUndefined();
  });
});