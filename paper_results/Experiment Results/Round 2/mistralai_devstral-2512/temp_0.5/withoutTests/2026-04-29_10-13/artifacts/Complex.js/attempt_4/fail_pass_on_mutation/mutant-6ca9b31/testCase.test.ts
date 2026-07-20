import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.toString()", () => {
  it("should correctly format complex numbers with negative zero imaginary parts", () => {
    const c = new Complex(3, -0);
    expect(c.toString()).toBe("3");
  });
});