import { Complex } from "./complex.js";

describe("Complex acoth method", () => {
  it("should correctly compute acoth for a real number greater than 1", () => {
    const c = new Complex(2, 0);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});