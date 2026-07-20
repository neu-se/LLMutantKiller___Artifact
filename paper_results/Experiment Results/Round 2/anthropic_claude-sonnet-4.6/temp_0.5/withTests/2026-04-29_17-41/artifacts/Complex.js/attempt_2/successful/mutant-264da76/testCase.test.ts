import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should satisfy acoth(z) === atanh(1/z) for z = 2+i", () => {
    // acoth(z) = atanh(1/z) by definition
    // For z = 2+i: d = a^2 + b^2 = 5
    // Original code: new Complex(a/d, -b/d).atanh() = atanh(1/z) -- correct
    // Mutated code:  new Complex(a/d, -b*d).atanh() = atanh(0.4 - 5i) -- wrong
    const z = new Complex(2, 1);
    const result = z.acoth();

    // Independently compute atanh(1/z) = atanh(0.4 - 0.2i)
    const inverse = z.inverse(); // 1/z = (2-i)/5 = 0.4 - 0.2i
    const expected = inverse.atanh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});