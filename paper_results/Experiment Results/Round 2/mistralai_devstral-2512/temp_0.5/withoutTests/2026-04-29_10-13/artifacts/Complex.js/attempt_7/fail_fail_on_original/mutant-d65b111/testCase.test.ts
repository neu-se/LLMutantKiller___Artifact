import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute asech for a complex number with specific values", () => {
    const c = new Complex(1, 1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.4435682501953125);
    expect(result.im).toBeCloseTo(-0.9272952180016122);
  });
});