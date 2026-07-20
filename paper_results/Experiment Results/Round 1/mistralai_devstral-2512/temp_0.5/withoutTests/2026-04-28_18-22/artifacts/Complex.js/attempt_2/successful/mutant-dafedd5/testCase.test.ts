import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil the real part with a specified decimal place", () => {
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(2);
    expect(result.re).toBe(1.24);
    expect(result.im).toBe(5.68);
  });
});