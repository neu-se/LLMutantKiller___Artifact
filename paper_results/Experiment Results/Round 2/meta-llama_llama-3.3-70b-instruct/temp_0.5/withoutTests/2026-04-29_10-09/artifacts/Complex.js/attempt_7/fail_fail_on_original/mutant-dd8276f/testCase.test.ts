import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex arcus cosecans for a specific case", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});