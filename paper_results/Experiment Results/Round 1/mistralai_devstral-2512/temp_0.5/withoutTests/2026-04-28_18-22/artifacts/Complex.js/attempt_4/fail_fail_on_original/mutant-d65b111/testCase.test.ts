import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.380533329652244);
  });
});