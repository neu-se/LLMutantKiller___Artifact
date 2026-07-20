import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth(2) correctly as atanh(0.5)", () => {
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBe(0);
  });
});