import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch for a complex number with d > 0", () => {
    // z = 2 + i, d = 4 - 1 = 3 > 0
    // Both original and mutated take if-branch
    // acsch(2+i) via code: asinh(2/3 - i/3)
    const z = new Complex(2, 1);
    const inner = new Complex(2/3, -1/3);
    const expected = inner.asinh();
    const result = z.acsch();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});