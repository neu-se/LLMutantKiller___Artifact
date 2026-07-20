import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return NaN for log(-0)", () => {
    const result = new Complex(-0, 0).log();
    expect(result.isNaN()).toBe(true);
  });
});