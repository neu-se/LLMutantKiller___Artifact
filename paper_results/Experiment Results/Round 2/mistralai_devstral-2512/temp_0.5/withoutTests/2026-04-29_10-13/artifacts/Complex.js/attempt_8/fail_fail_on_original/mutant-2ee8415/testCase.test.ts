import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly handle property assignment in acosh method", () => {
    const c = new Complex(2, 1);
    const result = c.acosh();
    // The mutation changes this['re'] to this[""] which would create a new property
    // This test checks that the result has exactly the expected properties
    const keys = Object.keys(result);
    expect(keys).toContain('re');
    expect(keys).toContain('im');
    expect(keys.length).toBe(2);
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBeCloseTo(0.48121182505960347);
  });
});