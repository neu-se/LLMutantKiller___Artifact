import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return finite values for finite inputs", () => {
    const result = new Complex(1, 1).sinh();
    expect(result.isFinite()).toBe(true);
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});