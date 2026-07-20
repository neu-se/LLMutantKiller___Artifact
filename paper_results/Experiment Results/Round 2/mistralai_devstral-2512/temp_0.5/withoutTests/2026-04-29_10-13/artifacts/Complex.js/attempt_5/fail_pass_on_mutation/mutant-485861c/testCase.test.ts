import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should not have empty string property when parsing undefined", () => {
    const result = new Complex(undefined);
    expect(result.hasOwnProperty("")).toBe(false);
  });
});