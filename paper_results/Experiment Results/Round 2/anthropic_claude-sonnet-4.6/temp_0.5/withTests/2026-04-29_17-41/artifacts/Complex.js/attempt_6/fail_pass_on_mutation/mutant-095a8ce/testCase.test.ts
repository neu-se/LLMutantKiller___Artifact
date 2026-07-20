import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc should be defined and callable on Complex instances", () => {
    const c = new Complex(1, 0);
    expect(typeof c['acsc']).toBe('function');
    const result = c['acsc']();
    expect(result).toBeDefined();
    expect(typeof result['re']).toBe('number');
  });
});