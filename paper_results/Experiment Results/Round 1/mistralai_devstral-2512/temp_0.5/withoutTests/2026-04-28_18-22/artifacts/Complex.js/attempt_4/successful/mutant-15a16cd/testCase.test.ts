import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil a complex number with 2 decimal places", () => {
    const c = new Complex(1.23456, 5.67891);
    const result = c.ceil(2);
    expect(result.re).toBe(1.24);
    expect(result.im).toBe(5.68);
  });
});