import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant for a complex number with equal real and imaginary parts", () => {
    const c = new Complex(2, 2);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.2261392235755953);
    expect(result.im).toBeCloseTo(-1.1780972450961724);
  });
});