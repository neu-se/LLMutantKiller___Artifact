import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth method", () => {
  it("should correctly handle the case when d is zero and b is non-zero", () => {
    const result = new Complex(0, 1).acoth();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 4);
  });
});