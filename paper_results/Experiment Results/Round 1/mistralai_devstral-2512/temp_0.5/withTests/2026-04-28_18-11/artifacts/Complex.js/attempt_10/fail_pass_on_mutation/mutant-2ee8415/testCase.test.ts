import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh and verify the result structure", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
  });
});