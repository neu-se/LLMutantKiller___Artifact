import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil complex numbers with specified precision", () => {
    const c = new Complex(1.234, 2.345);
    const result = c.ceil(1);
    expect(result.re).toBe(1.3);
    expect(result.im).toBe(2.4);
  });
});