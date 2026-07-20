import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth method", () => {
  it("should throw when accessing invalid property in acoth", () => {
    const c = new Complex(2, 0);
    expect(() => {
      c.acoth();
    }).toThrow();
  });
});