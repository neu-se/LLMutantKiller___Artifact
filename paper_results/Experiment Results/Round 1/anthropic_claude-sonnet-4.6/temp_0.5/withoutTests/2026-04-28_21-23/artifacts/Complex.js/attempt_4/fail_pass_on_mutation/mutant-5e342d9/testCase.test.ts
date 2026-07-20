import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sign with large numbers", () => {
  it("sign of large complex number should have magnitude 1", () => {
    const z = new Complex(4000, 3000);
    const s = z.sign();
    // sign = z / |z|, so |sign| should be 1
    expect(s.abs()).toBeCloseTo(1, 10);
  });
});