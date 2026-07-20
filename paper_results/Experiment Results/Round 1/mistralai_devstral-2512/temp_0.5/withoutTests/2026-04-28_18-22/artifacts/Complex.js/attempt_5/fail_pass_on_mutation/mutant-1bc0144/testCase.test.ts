import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should throw when accessing invalid property in asech", () => {
    const c = new Complex(1, 1);
    expect(() => c.asech()).not.toThrow();
  });
});