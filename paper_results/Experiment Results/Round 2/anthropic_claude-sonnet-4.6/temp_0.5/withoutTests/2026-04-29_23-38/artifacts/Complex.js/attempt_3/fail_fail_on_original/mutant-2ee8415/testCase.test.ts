import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a complex number where acos returns positive imaginary part", () => {
    // For acosh(0 + 2i), the else branch of acosh is taken
    // The real part should equal the imaginary part of acos(2i)
    const result = new Complex(0, 2).acosh();
    const expected = new Complex(0, 2).acos();
    
    // In the else branch: re should become old im, im should become -old re
    // So result.re should equal expected.im, result.im should equal -expected.re
    expect(result.re).toBeCloseTo(expected.im, 10);
    expect(result.im).toBeCloseTo(-expected.re, 10);
  });
});