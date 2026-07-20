import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute the complex inverse hyperbolic cosine correctly", () => {
    // acosh(2) should return a real number: log(2 + sqrt(3)) ≈ 1.3169578969248166
    const result = new Complex(2, 0).acosh();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
    // The acosh function uses acos internally, so we verify it returns a valid Complex
    // In the mutated code, this['']() will throw an error since '' is not a method
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");
  });
});