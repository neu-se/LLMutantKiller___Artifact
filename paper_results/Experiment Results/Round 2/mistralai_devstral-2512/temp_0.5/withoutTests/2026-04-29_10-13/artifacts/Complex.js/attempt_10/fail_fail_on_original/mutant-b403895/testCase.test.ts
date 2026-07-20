import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct value for (0, 1) input", () => {
    const result = new Complex(0, 1).asec();
    expect(result.re).toBeCloseTo(1.5707963267948966, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});