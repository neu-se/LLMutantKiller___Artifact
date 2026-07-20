import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil a complex number with 0 decimal places", () => {
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(0);
    expect(result.re).toBe(2);
    expect(result.im).toBe(6);
  });
});