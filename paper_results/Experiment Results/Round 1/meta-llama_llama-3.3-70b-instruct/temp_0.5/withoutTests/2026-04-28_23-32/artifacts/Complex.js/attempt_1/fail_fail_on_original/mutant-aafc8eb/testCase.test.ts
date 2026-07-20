import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for the cosm1 function", () => {
    const complex = new Complex(1, 0);
    const result = complex.cosm1(0.1);
    expect(result).toBeCloseTo(-0.005000000000000001);
  });
});