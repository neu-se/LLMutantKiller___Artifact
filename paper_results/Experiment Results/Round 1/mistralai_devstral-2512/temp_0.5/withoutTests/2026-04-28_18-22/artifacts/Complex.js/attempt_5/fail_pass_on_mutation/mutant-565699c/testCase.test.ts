import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values in expm1", () => {
    // Test with a small real value where cosm1 is used in expm1
    const x = 0.01;
    const c = new Complex(0, x);
    const result = c.expm1();
    // For small imaginary numbers, expm1 should be approximately (cosm1(x), x)
    // The mutation would cause cosm1 to return a much larger value
    // We check that the real part is close to the expected cosm1(x) value
    const expectedReal = Math.expm1(0) * Math.cos(x) + (Math.cos(x) - 1);
    expect(result.re).toBeCloseTo(expectedReal, 5);
    expect(result.im).toBeCloseTo(Math.exp(0) * Math.sin(x), 5);
  });
});