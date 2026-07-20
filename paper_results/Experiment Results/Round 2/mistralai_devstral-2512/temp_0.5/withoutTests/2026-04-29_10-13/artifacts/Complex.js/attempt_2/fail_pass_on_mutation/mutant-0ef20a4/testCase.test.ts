import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("should return the correct inverse for a non-zero complex number", () => {
    const c = new Complex(2, 3);
    const result = c.inverse();
    const expected = new Complex(2/13, -3/13);
    expect(result.equals(expected)).toBe(true);
  });
});