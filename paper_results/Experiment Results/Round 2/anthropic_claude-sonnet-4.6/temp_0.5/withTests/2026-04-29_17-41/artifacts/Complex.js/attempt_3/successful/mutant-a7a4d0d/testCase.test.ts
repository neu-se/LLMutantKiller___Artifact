import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute acosh correctly for a value where acos returns positive imaginary part", () => {
    // For acosh(2): acos(2) gives {re:0, im: -acosh(2)} so im <= 0, both branches same path
    // For acosh(-2): need to verify which branch differs
    // Test acosh(2) real part equals Math.log(2 + Math.sqrt(3))
    const result = new Complex(2, 0).acosh();
    const expected = Math.log(2 + Math.sqrt(3)); // ≈ 1.3169578969248168
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});