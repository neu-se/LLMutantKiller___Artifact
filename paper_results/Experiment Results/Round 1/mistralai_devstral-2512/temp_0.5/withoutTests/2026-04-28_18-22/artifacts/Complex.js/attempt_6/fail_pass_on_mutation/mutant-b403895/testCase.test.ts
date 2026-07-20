import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly handle division by zero in asec for complex numbers with zero magnitude", () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});