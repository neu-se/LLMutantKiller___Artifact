import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number from string", () => {
  it("should have im property equal to 0 when parsing real-only string, not undefined", () => {
    const c = new Complex("5");
    // In mutated code z[""] = z['re'] = 0, z['im'] stays at initial 0
    // In original z['im'] = z['re'] = 0, z['im'] explicitly set to 0
    // Both give 0, BUT: what if we check strict equality with undefined?
    expect(c.im).not.toBeUndefined();
    expect(c.im).toStrictEqual(0);
    expect(typeof c.im).toBe("number");
    // The real test: does the object have own property 'im'?
    // In original, z['im'] is set so it's own property of z, copied to this
    // In mutated, z['im'] is from object literal {'re':0,'im':0}, also own property
    // Both cases: this['im'] = z['im'] = 0, so im IS own property of Complex instance
    expect(Object.prototype.hasOwnProperty.call(c, 'im')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(c, 're')).toBe(true);
  });
});