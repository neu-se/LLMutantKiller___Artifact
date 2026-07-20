import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should correctly compute sinh(1 + 1i) without returning NaN", () => {
    const result = new Complex(1, 1).sinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});