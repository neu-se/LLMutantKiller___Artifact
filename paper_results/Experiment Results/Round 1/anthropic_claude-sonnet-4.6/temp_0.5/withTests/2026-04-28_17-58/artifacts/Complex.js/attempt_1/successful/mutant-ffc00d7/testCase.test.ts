import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing validation", () => {
  it("should throw SyntaxError when imaginary unit appears without a preceding sign after another imaginary unit", () => {
    // 'ii' has two consecutive imaginary units without a sign between them
    // After parsing the first 'i', plus+minus becomes 0
    // The second 'i' should trigger the validation check (plus+minus === 0 => SyntaxError)
    // With the mutation (if false), this check is skipped and no error is thrown
    expect(() => new Complex('ii')).toThrow(SyntaxError);
  });
});