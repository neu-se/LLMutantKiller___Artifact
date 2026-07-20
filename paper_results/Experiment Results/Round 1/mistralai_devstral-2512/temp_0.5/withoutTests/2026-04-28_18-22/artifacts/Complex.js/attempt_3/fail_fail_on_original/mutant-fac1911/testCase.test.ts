import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.17328679513998632, 10);
    expect(result.im).toBeCloseTo(-0.3217505543966422, 10);
  });
});