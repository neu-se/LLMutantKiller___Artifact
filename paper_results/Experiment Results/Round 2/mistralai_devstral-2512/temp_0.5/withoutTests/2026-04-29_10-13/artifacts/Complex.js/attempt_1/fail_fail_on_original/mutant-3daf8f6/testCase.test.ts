import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should correctly handle boundary case where a = 3000 and b < 3000", () => {
    const c = new Complex(3000, 2000);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(3000), 10);
    expect(result.im).toBeCloseTo(Math.atan2(2000, 3000), 10);
  });
});