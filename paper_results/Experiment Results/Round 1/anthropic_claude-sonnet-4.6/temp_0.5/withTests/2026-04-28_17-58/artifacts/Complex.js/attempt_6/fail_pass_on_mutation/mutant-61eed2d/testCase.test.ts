import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should serialize correctly to JSON without empty string key", () => {
    const c = new Complex("5+3i");
    const json = JSON.stringify(c);
    const parsed = JSON.parse(json);
    // In mutated code, z[""] = 0 is set on the local parse object z
    // but this doesn't transfer to the Complex instance
    // However, let's check if the prototype has "" property
    expect(parsed[""]).toBeUndefined();
    expect(c.re).toBe(5);
    expect(c.im).toBe(3);
    // Check that no enumerable "" property exists anywhere in prototype chain
    expect("" in c).toBe(false);
  });
});