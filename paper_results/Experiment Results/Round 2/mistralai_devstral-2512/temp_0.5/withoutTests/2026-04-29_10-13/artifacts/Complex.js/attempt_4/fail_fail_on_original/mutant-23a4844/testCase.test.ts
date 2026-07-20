import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle real numbers greater than 1 by producing proper imaginary component", () => {
    const result = new Complex(2, 0).atanh();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});