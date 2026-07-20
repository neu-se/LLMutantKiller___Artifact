import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly and not throw error when accessing result.re", () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(() => {
      const tmp = result.re;
    }).not.toThrowError();
  });
});