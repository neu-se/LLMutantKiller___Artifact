import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string and have im property as own property equal to 0 when no imaginary part", () => {
    const c = new Complex("5");
    expect(Object.prototype.hasOwnProperty.call(c, 'im')).toBe(true);
    expect(c['im']).toBe(0);
    expect(c['re']).toBe(5);
    // Check no spurious empty-string property exists on the result
    const keys = Object.keys(c);
    expect(keys).not.toContain('');
    expect(keys).toContain('im');
    expect(keys).toContain('re');
  });
});