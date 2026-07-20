import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should correctly compute logHypot for values exactly at the boundary condition", () => {
    const c = new Complex(3000, 1);
    const result = c.log();
    // The original code uses Math.sqrt(a*a + b*b) for a < 3000
    // The mutated code uses the fallback for a <= 3000
    // We need to verify the exact behavior at this boundary
    const expectedRe = Math.log(Math.sqrt(3000*3000 + 1*1));
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(Math.atan2(1, 3000), 12);
  });
});