import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.2373046875, 6);
    expect(result.im).toBeCloseTo(1.9161704985, 6);
  });
});