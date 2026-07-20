import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot mutation", () => {
  it("abs with large negative real component", () => {
    // x=-4000, y=3000: a=4000, b=3000, a>=b
    // original b=x/y = -4000/3000 = -4/3, return 4000*sqrt(1+16/9)=5000
    // mutated b=x*y = -4000*3000=-12000000, return 4000*sqrt(1+144e12)=huge
    const z = new Complex(-4000, 3000);
    expect(z.abs()).toBeCloseTo(5000, 5);
  });
});