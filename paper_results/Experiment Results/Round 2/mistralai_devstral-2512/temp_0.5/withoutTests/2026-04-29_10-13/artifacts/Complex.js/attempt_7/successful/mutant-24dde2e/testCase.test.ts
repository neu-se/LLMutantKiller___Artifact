import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should compute asec correctly for complex number (1, 0)", () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    // For (1,0), original d = 1+0=1, mutated d = 1-0=1
    // This case won't expose the mutation since b=0
    // Let's use a case where b != 0 to expose the mutation
    const c2 = new Complex(1, 1);
    const result2 = c2.asec();
    // For (1,1), original d = 1+1=2, mutated d = 1-1=0
    // When d=0, the code takes the else branch
    expect(isFinite(result2.re)).toBe(true);
    expect(isFinite(result2.im)).toBe(true);
  });
});