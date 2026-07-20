import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct sign for imaginary part when input is (0,0)", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.im).toBe(Infinity);
    expect(1 / result.im).toBe(0);
  });
});