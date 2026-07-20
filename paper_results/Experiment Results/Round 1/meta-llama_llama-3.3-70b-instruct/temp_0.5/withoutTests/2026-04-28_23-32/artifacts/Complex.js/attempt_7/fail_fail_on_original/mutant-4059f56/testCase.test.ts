import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should clone the complex number correctly", () => {
    const complex = new Complex(1, 2);
    const cloned = complex.clone();
    expect(cloned).toHaveProperty('re', 1);
    expect(cloned).toHaveProperty('im', 2);
    expect(() => cloned[""]).toThrowError();
  });
});