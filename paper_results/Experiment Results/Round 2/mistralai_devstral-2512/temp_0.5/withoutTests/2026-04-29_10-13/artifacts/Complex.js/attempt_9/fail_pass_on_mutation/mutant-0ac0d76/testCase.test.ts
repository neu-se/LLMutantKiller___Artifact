import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should correctly handle the boundary case where real part is exactly 0", () => {
    const zeroReal = new Complex(0, 1);
    const result = zeroReal.log();
    expect(result.re).toBeCloseTo(Math.log(1));
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});