import { Complex } from "../complex.js";

describe("Complex", () => {
  it("should clone the complex number correctly", () => {
    const complex = new Complex(1, 2);
    const cloned = complex.clone();
    expect(cloned).toEqual({ re: 1, im: 2 });
  });
});