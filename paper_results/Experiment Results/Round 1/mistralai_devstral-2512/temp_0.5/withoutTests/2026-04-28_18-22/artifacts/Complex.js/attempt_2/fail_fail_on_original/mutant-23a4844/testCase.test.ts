import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh method", () => {
  it("should correctly handle real numbers equal to -1", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});