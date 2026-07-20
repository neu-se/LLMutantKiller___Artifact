import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs is symmetric for large values", () => {
    // Due to the asymmetric first condition (a < 3000 && b <= 3000),
    // hypot(2999, 3000) uses direct sqrt while hypot(3000, 2999) uses overflow-safe
    // But both should give the same mathematical result
    expect(new Complex(2999, 3000).abs()).toBeCloseTo(new Complex(3000, 2999).abs(), 10);
  });
});