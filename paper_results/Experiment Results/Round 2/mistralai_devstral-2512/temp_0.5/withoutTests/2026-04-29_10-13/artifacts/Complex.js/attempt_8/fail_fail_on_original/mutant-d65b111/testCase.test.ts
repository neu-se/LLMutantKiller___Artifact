import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute asech for a complex number with a=0.1 and b=0.1", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(2.252763451820128);
    expect(result.im).toBeCloseTo(-0.1418970546041546);
  });
});