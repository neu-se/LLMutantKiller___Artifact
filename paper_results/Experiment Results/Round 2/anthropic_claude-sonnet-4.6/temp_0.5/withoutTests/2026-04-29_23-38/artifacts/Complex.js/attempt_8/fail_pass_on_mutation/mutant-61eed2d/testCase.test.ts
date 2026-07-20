import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a real-only string and have im equal to exactly 0 not undefined", () => {
    const c = new Complex("5");
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
    expect(c.im).not.toBeUndefined();
    // In mutated code, z[""] = z['re'] = 0 sets z['re'] to 0 correctly
    // but z['im'] is never touched in the string case
    // z starts as { re: 0, im: 0 } so im is 0 from prototype: 'im': 0
    // Wait - z is a plain object literal { 're': 0, 'im': 0 }
    // so im is an own property with value 0 in both cases
    // I need to find another angle...
    // What if I test the valueOf which returns re when im===0?
    expect(c.valueOf()).toBe(5);
  });
});