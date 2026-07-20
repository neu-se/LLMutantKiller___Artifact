import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number with specific values", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    expect(result.re).toBeCloseTo(1.3654, 4);
    expect(result.im).toBeCloseTo(-0.4321, 4);
  });
});