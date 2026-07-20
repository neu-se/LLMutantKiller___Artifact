import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should return the correct result for acsc when a and b are 0", () => {
    const complex = new Complex(0, 0);
    expect(complex.acsc().toString()).toBe("0.7853981633974483i");
  });
});