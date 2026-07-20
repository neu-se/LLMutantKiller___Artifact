import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should compute asec correctly for complex number (0, 1)", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    // For (0,1), original d = 0+1=1, mutated d = 0-1=-1
    // This will produce different results in the acosh calculation
    expect(result.re).toBeCloseTo(0, 6);
    expect(result.im).toBeCloseTo(1.57079632679, 6);
  });
});