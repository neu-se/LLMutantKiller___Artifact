import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct result for log(-1)", () => {
    const result = new Complex(-1, 0).log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI);
  });
});