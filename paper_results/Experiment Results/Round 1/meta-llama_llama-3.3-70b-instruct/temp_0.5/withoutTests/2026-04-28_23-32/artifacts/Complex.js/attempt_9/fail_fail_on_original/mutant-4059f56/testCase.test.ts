import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should clone the complex number correctly", () => {
    const complex = new Complex(1, 2);
    const cloned = complex.clone();
    expect(cloned).toHaveProperty('re');
    expect(cloned).toHaveProperty('im');
    expect(() => {
      const temp = cloned["re"];
    }).not.toThrow();
    expect(() => {
      const temp = cloned[""];
    }).toThrowError();
  });
});