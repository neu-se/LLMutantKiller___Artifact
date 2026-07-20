import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil a complex number with default places", () => {
    const c = new Complex(1.234, 5.678);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(6);
  });
});