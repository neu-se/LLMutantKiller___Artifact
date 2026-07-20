import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate sech", () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.265, 3);
    expect(result.im).toBeCloseTo(-0.026, 3);
  });
});