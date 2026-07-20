import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should return 0^(0+0i) as 1", () => {
    const zero = new Complex(0, 0);
    const result = zero.pow(0, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});