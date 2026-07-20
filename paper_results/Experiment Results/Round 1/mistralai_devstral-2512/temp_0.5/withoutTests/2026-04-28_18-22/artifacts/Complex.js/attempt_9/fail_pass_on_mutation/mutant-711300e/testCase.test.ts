import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse object with 'r' and 'phi' properties", () => {
    const c = new Complex({ r: 2, phi: Math.PI/4 });
    expect(c.re).toBeCloseTo(Math.sqrt(2));
    expect(c.im).toBeCloseTo(Math.sqrt(2));
  });
});