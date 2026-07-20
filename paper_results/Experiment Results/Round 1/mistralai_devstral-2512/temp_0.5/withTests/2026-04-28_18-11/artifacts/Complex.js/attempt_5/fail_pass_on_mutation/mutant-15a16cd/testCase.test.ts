import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil with default precision when no places parameter is provided", () => {
    const c = new Complex(1.123456, -2.987654);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(-2);
  });
});