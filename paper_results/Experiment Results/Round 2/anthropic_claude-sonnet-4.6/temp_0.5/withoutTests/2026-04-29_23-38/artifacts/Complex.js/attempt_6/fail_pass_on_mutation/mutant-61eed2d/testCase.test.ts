import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse string representation back from toString", () => {
    const original = new Complex(3, 4);
    const str = original.toString();
    const parsed = new Complex(str);
    expect(parsed.re).toBe(3);
    expect(parsed.im).toBe(4);
    expect(parsed.equals(original)).toBe(true);
    // In mutated code z[""] gets set - verify no extra enumerable properties
    const keys = Object.keys(parsed);
    expect(keys).not.toContain('');
  });
});