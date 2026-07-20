import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with array input", () => {
  it("should correctly parse complex number from array format", () => {
    const c = new Complex([2, 7]);
    expect(c.re).toBe(2);
    expect(c.im).toBe(7);
  });
});