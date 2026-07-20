import { Complex } from "../complex";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.im).not.toBeNaN();
    const d = new Complex(2, 3);
    const result2 = d.acosh();
    expect(result2.im).not.toBeNaN();
    expect(() => {
      const e = new Complex(NaN, NaN);
      e.acosh();
    }).not.toThrow();
  });
});