import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function mutation", () => {
  it("should correctly compute hypot when x is 0 and y is large", () => {
    const c = new Complex(0, 3000);
    const abs = c.abs();
    expect(abs).toBe(3000);
  });
});