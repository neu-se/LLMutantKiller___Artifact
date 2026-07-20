import { Complex } from "./complex";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for complex numbers with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.402359478108525, 10);
    expect(result.im).toBeCloseTo(-0.553574358897045, 10);
  });
});