import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly handle the mutation in acosh for complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // This test specifically checks the behavior that would be affected by the mutation
    // where res['im'] = -res[""] would cause a type error in the mutated version
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.im)).toBe(false);
  });
});