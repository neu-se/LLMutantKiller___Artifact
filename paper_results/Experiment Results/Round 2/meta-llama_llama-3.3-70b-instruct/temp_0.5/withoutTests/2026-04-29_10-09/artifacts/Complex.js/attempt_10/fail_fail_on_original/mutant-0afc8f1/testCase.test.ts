import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should have asech function defined and not empty", () => {
    const complex = new Complex(0, 0);
    expect(complex.asech).toBeInstanceOf(Function);
    const asechString = complex.asech.toString();
    expect(asechString).not.toContain("function () {}");
  });
});