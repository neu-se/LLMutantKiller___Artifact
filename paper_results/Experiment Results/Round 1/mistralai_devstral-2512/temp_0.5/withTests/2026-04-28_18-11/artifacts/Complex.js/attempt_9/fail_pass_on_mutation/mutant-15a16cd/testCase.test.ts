import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil with default precision when places is falsy", () => {
    const c = new Complex(1.123, -2.456);
    const result = c.ceil(0);
    expect(result.re).toBe(2);
    expect(result.im).toBe(-2);
  });
});