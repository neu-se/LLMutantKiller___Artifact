import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should throw an error when accessing invalid property", () => {
    const c = new Complex(1, 2);
    expect(() => c.sech()).toThrow();
  });
});