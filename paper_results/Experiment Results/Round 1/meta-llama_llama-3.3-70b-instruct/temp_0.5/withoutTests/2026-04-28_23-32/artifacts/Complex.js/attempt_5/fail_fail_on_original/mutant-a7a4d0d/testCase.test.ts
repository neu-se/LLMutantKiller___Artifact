import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly for a specific case", () => {
    const complex = new Complex(1, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(-1, -1);
    const result2 = complex2.acosh();
    expect(result2.re).toBeCloseTo(1.0612750619050357);
    expect(result2.im).toBeCloseTo(-2.0943951023931953);
  });
});