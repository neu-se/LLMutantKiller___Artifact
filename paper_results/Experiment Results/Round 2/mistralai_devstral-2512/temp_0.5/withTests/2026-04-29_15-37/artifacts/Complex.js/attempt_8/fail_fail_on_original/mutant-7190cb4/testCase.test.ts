import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct imaginary part sign for acsc(0,0)", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.im).toBe(Infinity);
    expect(result.toString()).toBe("1.5707963267948966 + Infinityi");
  });
});