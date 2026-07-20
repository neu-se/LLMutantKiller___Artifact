import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse object with 'abs' and 'arg' properties", () => {
    const c = new Complex({ abs: 2, arg: Math.PI/2 });
    expect(c.re).toBeCloseTo(0);
    expect(c.im).toBeCloseTo(2);
  });
});