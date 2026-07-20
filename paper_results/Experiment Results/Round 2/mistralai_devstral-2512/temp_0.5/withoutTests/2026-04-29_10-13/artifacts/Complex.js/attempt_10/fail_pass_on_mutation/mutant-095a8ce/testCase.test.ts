import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return the correct value for (0, 0) input", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBe(Infinity);
  });
});