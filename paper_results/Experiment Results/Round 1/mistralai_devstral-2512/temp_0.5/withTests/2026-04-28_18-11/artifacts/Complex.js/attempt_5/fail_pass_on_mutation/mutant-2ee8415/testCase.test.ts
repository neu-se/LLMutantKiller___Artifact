import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number and not have undefined properties", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(result).not.toHaveProperty("");
  });
});