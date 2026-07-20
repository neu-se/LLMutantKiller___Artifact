import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate asinh correctly", () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    const temp = result.re;
    result.re = -result.im;
    result.im = temp;
    expect(result.toString()).toBe(complex.asinh().toString());
  });
});