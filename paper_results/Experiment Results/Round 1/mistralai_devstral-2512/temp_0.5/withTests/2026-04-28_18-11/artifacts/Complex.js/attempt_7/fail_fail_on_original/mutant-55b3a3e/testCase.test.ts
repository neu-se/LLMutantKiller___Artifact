import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle non-zero input correctly", () => {
    const result = new Complex(0, 0.5).acsc();
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});