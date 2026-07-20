import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a string with only imaginary part and verify the real part is not affected by mutation", () => {
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    expect(c.hasOwnProperty("")).toBe(false);
  });
});