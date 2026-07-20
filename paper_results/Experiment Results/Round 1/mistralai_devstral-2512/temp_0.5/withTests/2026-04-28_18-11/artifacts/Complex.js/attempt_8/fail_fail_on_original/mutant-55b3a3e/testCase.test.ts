import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle non-zero real and zero imaginary input correctly", () => {
    const result = new Complex(0.5, 0).acsc();
    expect(result.re).toBeCloseTo(1.1410731514938284, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});