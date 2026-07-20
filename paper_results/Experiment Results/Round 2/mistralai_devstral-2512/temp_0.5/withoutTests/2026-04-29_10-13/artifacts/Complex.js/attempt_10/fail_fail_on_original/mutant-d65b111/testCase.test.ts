import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute asech for a complex number with a=0.3 and b=0.4", () => {
    const c = new Complex(0.3, 0.4);
    const result = c.asech();
    expect(result.re).toBeCloseTo(1.265788851352253);
    expect(result.im).toBeCloseTo(-0.4636476090008061);
  });
});