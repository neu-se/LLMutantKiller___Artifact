import { Complex } from "../complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    expect(result.toString()).not.toBe("NaN");
  });
});