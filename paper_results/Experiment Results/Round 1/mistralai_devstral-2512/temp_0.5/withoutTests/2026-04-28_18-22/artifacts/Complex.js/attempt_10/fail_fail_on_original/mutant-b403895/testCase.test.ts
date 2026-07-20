import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute asec for complex numbers with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(1.5707963267948966, 10);
    expect(result.im).toBeCloseTo(-1.1512925464970228, 10);
  });
});