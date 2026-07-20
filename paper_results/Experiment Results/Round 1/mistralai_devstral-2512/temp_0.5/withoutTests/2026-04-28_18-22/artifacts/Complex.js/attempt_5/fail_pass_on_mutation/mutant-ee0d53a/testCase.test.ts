import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function", () => {
  it("should correctly compute hypot for values where a >= 3000 and b >= 3000", () => {
    const c = new Complex(3500, 3500);
    const abs = c.abs();
    expect(abs).toBeCloseTo(4949.747468, 5);
  });
});