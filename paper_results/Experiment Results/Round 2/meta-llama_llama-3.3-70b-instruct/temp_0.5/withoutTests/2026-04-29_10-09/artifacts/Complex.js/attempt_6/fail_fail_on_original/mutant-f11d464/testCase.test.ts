import { Complex } from "../../complex.js";

describe("Complex", () => {
  it("should handle fully imaginary base in pow function", () => {
    const complex = new Complex(0, 2);
    const result = complex.pow(2);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});