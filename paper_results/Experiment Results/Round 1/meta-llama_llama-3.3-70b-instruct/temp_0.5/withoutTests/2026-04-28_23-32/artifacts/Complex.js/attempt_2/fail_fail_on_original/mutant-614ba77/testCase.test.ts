import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should have a default export that is not an empty string", () => {
    expect(Object.keys(Complex)).not.toContain("");
    expect(Object.keys(Complex)).toContain("default");
  });
});