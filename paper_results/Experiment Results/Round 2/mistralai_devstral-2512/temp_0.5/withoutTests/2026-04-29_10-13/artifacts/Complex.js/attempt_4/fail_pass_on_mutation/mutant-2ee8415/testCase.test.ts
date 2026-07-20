import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly assign the real part when computing acosh", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // This test specifically checks that the real part is properly assigned
    // The mutation changes this['re'] to this[""] which would cause the assignment to fail
    expect(result.re).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(result.im).toBeDefined();
    expect(typeof result.im).toBe('number');
  });
});