import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a purely imaginary number", () => {
    const c = new Complex(0, 1);
    const result = c.csc();
    const expectedRe = 0;
    const expectedIm = -1.1883951057781212;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});