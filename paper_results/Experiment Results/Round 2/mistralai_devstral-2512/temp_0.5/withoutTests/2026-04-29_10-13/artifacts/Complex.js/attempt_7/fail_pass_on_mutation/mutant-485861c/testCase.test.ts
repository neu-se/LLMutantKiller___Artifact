import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse undefined input and maintain expected properties", () => {
    const result = new Complex(undefined);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(JSON.stringify(result)).toBe('{"re":0,"im":0}');
  });
});