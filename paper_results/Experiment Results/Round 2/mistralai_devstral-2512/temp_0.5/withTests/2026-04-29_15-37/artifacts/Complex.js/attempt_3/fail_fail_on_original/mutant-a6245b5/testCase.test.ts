import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should return Infinity for imaginary part when real part is -1 and imaginary part is 0", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.im).toBe(Infinity);
  });
});