import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should return a non-infinity value for acsc when a and b are 0", () => {
    const complex = new Complex(0, 0);
    expect(complex.acsc().toString()).not.toBe("Infinity");
  });
});