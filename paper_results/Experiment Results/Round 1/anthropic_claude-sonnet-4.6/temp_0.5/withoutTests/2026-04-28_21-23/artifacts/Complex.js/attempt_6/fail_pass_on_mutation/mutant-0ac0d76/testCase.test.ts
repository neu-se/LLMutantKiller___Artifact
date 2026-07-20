import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should correctly compute sqrt of -1 as i using pow", () => {
    // (-1)^0.5 should be i (0 + 1i)
    // Original: b===0, a=-1, a>0 is false -> falls to general formula -> Complex(0, 1)
    // Mutated: b===0, a=-1, a<=0 is true -> returns Math.pow(-1, 0.5) = NaN -> Complex(NaN, 0)
    const result = new Complex(-1, 0).pow(new Complex(0.5, 0));
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});