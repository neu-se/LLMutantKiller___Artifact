import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number with specific real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    const expectedRe = 1.168027322545485;
    const expectedIm = -0.489331300396189;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});