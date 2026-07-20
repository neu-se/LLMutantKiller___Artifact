import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should return correct sign for imaginary component with positive input", () => {
    const result = new Complex(0, 1).acoth();
    expect(result.im).toBeGreaterThan(0);
  });
});