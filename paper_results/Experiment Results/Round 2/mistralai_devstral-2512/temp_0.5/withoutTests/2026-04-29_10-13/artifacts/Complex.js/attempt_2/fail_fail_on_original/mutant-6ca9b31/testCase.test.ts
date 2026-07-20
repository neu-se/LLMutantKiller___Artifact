import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.toString()", () => {
  it("should correctly format complex numbers with negative imaginary parts", () => {
    const c = new Complex(3, -1);
    expect(c.toString()).toBe("3 - 1i");
  });
});