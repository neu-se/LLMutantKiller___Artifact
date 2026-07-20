import { Complex } from "./complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a complex number with positive real part", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.9833870299165354);
    expect(result.im).toBeCloseTo(1.0001435424738463);
  });
});