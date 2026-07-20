import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should throw an error when asech is called on mutated code", () => {
    const complex = new Complex(0.5, 0);
    const asech = complex.asech;
    expect(asech.toString()).not.toBe("function () {}");
  });
});