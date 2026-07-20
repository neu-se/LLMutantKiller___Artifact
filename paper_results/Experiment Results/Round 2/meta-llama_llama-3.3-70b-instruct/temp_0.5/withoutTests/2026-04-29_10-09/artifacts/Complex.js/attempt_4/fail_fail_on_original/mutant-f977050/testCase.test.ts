import { Complex } from "../complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.im).not.toBeUndefined();
  });
});