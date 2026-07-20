import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute acsch for complex numbers with both non-zero components", () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.1912239695300549, 10);
    expect(result.im).toBeCloseTo(-0.3389833821169983, 10);
  });
});