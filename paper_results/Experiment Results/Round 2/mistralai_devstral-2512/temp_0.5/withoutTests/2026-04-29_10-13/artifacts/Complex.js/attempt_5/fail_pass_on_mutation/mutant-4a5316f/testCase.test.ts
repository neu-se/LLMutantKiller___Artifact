import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct sign for imaginary part with purely imaginary input", () => {
    const c1 = new Complex(0, -1);
    const result1 = c1.acoth();
    const c2 = new Complex(0, 1);
    const result2 = c2.acoth();
    expect(Math.sign(result1.im)).toBe(-Math.sign(result2.im));
  });
});