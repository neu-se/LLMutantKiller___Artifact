import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle complex numbers where a^2 - b^2 = 0", () => {
    const c = new Complex(Math.sqrt(2), Math.sqrt(2));
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.4435682543851153);
    expect(result.im).toBeCloseTo(-0.3805063771123648);
  });
});