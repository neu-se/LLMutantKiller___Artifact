import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct imaginary part sign for pure imaginary inputs", () => {
    const c1 = new Complex(0, 1);
    const c2 = new Complex(0, -1);

    const result1 = c1.acot();
    const result2 = c2.acot();

    expect(Math.sign(result1.im)).toBe(-1);
    expect(Math.sign(result2.im)).toBe(1);
  });
});