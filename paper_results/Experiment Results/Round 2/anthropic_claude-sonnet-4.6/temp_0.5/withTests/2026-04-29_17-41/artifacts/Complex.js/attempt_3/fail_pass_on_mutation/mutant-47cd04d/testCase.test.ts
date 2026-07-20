import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add", () => {
  it("adding finite complex numbers works correctly", () => {
    const a = new Complex(3, 4);
    const b = new Complex(1, 2);
    const result = a.add(b);
    expect(result.re).toBe(4);
    expect(result.im).toBe(6);
  });
});