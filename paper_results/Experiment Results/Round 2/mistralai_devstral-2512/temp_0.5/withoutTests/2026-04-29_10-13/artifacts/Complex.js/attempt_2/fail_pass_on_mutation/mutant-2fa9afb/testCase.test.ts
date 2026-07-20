import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should correctly compute sinh(0 + 0i) as 0 + 0i", () => {
    const result = new Complex(0, 0).sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});