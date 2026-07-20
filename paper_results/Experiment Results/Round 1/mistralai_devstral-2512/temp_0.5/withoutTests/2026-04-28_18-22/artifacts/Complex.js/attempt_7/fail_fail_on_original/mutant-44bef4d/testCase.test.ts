import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant for a complex number with real part 0.5 and imaginary part 0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    const expectedRe = 0.402359478108525;
    const expectedIm = -1.0172219678978514;
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-10);
  });
});