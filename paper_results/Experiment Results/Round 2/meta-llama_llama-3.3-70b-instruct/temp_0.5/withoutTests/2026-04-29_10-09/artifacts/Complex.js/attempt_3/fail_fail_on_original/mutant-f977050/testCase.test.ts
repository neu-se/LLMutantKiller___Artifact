import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex('1+1i');
    const result = c.acosh();
    expect(result.im).not.toBeNaN();
  });
});