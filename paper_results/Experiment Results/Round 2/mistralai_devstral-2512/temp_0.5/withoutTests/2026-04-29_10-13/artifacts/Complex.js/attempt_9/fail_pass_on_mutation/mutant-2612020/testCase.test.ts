import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers from strings and maintain proper state", () => {
    const c1 = new Complex("i");
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);

    const c2 = new Complex("2+3i");
    expect(c2.re).toBe(2);
    expect(c2.im).toBe(3);

    const c3 = new Complex("5");
    expect(c3.re).toBe(5);
    expect(c3.im).toBe(0);
  });
});