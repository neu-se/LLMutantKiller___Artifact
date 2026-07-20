import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse undefined input and not have empty string in property enumeration", () => {
    const result = new Complex(undefined);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    for (const key in result) {
      expect(key).not.toBe("");
    }
  });
});