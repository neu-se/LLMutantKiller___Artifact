import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs overflow-safe path", () => {
  it("correctly computes abs when imaginary part is larger than real part and both are large", () => {
    // a = 3000, b = 5000: a < b in both original and mutated
    const c = new Complex(3000, 5000);
    expect(c.abs()).toBeCloseTo(Math.sqrt(3000*3000 + 5000*5000), 10);
  });
});