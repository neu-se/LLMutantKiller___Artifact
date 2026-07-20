import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse mutation detection", () => {
  it("original sets z['im'] via chain assignment while mutated sets z[''] twice - detect via re property being set", () => {
    // In original: z[""] = z['im'] = 0 means z['re'] is set through z[""] = (z['im'] = 0)
    // Actually z[""] gets value 0, z['im'] gets value 0
    // But z['re'] is initialized to 0 already
    // The key: in original z[""] = z['im'] = 0, the z[""] assignment happens AFTER z['im']
    // Try passing a value that would make re non-zero if not reset
    const c1 = new Complex(null);
    const c2 = new Complex(undefined);
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(0);  
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(0);
    // Check that "" property is not set on the Complex instance in original
    expect(Object.prototype.hasOwnProperty.call(c1, '')).toBe(false);
  });
});