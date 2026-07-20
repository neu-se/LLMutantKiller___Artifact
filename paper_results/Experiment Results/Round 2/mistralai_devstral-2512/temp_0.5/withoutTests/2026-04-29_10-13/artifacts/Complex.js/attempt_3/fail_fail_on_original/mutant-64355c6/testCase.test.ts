import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct value for asec(2, 0)", () => {
    const result = new Complex(2, 0).asec();
    expect(result.isFinite()).toBe(true);
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});