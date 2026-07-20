import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number with real part 1 and imaginary part 1", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.6215180171704285, 10);
    expect(result.im).toBeCloseTo(-0.912074264038811, 10);
  });
});