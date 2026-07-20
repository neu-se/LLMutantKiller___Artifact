import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should not throw an error for valid complex numbers", () => {
    const c = new Complex(1, 1);
    expect(() => c.acsch()).not.toThrow();
  });
});