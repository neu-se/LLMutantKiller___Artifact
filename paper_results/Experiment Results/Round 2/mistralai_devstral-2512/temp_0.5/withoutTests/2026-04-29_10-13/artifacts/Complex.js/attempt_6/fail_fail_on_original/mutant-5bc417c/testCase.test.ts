import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for complex number (2, 3)", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.1521752325639557);
    expect(result.im).toBeCloseTo(-0.3398369094541219);
  });
});