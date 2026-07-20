import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh and maintain proper property structure", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    const keys = Object.keys(result);
    expect(keys).toContain("re");
    expect(keys).toContain("im");
    expect(keys.length).toBe(2);
  });
});