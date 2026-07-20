import Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex acsc", () => {
  it("acsc(0) should have real part equal to PI/2", () => {
    const result = new Complex(0, 0).acsc();
    const expected = Math.PI / 2;
    expect(result.re).not.toBe(0);
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-10);
  });
});