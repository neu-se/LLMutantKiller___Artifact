import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly handle default parameter when places is undefined", () => {
    const c = new Complex(1.5, -2.5);
    const result = c.ceil(undefined);
    expect(result.re).toBe(2);
    expect(result.im).toBe(-2);
  });
});