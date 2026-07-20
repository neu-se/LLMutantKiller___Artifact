import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly handle the case when a is 0 and b is non-zero", () => {
    const result = new Complex(0, 1).acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.7853981633974483, 10);
    expect(result.toString()).toBe("0 - 0.7853981633974483i");
  });
});