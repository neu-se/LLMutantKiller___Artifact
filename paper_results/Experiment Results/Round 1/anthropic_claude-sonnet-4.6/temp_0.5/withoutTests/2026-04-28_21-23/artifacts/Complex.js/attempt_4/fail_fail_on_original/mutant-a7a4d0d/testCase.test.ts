import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute acosh(2+3i) with correct real and imaginary parts", () => {
    const result = new Complex(2, 3).acosh();
    // Original: else branch gives re=res.im (positive), im=-res.re (negative)
    // Mutant: if branch gives re=-res.im (negative), im=res.re (positive)
    // So original has negative im, mutant has positive im
    expect(result.im).toBeCloseTo(-1.0001435424737972, 5);
  });
});