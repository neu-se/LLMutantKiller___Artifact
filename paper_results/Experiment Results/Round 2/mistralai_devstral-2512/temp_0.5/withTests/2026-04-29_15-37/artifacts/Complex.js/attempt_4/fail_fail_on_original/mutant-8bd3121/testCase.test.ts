import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should throw an error when accessing invalid property", () => {
    const z = new Complex(0.5, 0.5);
    expect(() => {
      // This will trigger the mutation where this[""] is accessed
      z.asech();
    }).toThrow();
  });
});