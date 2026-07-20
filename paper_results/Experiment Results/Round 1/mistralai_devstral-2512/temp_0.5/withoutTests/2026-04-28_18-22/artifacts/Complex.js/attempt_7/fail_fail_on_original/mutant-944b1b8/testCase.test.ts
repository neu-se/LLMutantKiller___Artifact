import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct result for asec(1, 1)", () => {
    const result = new Complex(1, 1).asec();
    expect(result.re).toBeCloseTo(0.4135, 4);
    expect(result.im).toBeCloseTo(-0.8323, 4);
  });
});