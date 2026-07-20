import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle real numbers greater than 1 with zero imaginary part", () => {
    const result = new Complex(1.1, 0).atanh();
    expect(result.re).toBeCloseTo(1.5222563785251245);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});