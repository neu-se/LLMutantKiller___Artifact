import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc(2) as asin(1/2) = pi/6", () => {
    // acsc(2) = asin(1/2) = pi/6
    // In the acsc implementation, for z = 2+0i:
    //   d = a*a + b*b = 4
    //   Original: new Complex(a/d, -b/d).asin() = new Complex(0.5, 0).asin() = pi/6
    //   Mutated:  new Complex(a*d, -b/d).asin() = new Complex(8, 0).asin() != pi/6
    const result = new Complex(2, 0).acsc();
    const expected = Math.PI / 6; // asin(0.5) = pi/6

    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});