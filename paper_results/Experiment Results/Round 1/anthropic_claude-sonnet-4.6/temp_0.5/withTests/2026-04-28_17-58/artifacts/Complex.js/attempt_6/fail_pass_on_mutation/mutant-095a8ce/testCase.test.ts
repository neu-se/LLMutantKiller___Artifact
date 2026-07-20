import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should have acsc method that returns correct value for input 2", () => {
    const z = new Complex(2, 0);
    const result = z.acsc();
    // acsc(2) = asin(1/2) = PI/6
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});