import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth method", () => {
  it("should correctly compute acoth for a specific complex number", () => {
    const c = new Complex(1.5, 0.5);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.6412373393653842);
    expect(result.im).toBeCloseTo(-0.6412373393653842);
  });
});