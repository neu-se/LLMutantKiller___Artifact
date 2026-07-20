import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.csc();
    expect(result.re).toBeCloseTo(-0.0887552835557175, 10);
    expect(result.im).toBeCloseTo(-0.13313292533357625, 10);
  });
});