import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh for a purely real number greater than 1", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.31696, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});