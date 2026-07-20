import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should calculate asec correctly", () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});