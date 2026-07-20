import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting infinite from infinite complex number", () => {
    const infinite1 = Complex.INFINITY;
    const infinite2 = Complex.INFINITY;
    const result = infinite1.sub(infinite2);
    expect(result.isNaN()).toBe(true);
  });
});