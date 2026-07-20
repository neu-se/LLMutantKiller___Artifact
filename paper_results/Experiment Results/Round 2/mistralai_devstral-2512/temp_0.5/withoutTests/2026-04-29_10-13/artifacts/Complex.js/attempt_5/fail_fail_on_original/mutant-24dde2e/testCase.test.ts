import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should produce correct result for asec(0.5, 0.5)", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asec();
    // The mutation changes d = a*a + b*b to d = a*a - b*b
    // For (0.5,0.5), original d = 0.25+0.25=0.5, mutated d = 0.25-0.25=0
    // When d=0, the code takes the else branch which should produce different results
    expect(result.re).toBeCloseTo(1.047, 3);
    expect(result.im).toBeCloseTo(-0.549, 3);
  });
});