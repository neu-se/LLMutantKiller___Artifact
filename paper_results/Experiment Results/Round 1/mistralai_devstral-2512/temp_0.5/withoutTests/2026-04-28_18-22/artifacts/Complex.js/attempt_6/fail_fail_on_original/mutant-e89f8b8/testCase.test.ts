import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a complex number with specific values", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(9.96664442374455, 10);
    expect(result.im).toBeCloseTo(-0.033898338211212, 10);
  });
});