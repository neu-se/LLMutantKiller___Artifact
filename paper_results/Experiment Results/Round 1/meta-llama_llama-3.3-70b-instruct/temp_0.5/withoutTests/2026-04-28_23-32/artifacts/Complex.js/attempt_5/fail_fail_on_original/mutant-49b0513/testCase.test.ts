import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate atanh correctly", () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});