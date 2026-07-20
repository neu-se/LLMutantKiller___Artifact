import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should compute asec correctly for complex number (1, 1)", () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    // For (1,1), original d = 1+1=2, mutated d = 1-1=0
    // When d=0, the code takes a different path that should produce different results
    expect(result.re).toBeCloseTo(0.443, 3);
    expect(result.im).toBeCloseTo(-1.061, 3);
  });
});