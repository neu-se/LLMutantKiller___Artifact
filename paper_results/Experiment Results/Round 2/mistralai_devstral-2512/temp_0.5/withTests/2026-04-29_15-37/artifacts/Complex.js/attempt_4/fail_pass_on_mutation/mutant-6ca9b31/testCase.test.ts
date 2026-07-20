import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex number with negative zero imaginary part", () => {
    const c = new Complex(1, -0);
    expect(c.toString()).toBe("1");
  });
});