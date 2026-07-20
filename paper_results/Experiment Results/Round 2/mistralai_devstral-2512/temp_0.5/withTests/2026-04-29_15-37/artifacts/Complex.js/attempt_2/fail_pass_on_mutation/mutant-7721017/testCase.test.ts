import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle 0^0 case", () => {
    const result = new Complex(0, 0).pow(0, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});