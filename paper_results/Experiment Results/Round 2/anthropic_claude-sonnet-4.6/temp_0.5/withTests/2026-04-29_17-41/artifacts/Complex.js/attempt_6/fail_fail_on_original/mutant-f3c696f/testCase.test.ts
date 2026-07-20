import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot of complex number with negative imaginary part gives correct sign", () => {
    // acot(0 + 0.5i): d = 0.25, uses new Complex(0, -2).atan()
    // atan(0, -2): d = (1-(-2))^2 = 9
    // (1 - 4 - 0)/9 = -1/3, t1 = log(-1/3, 0) 
    // log(-1/3, 0): b===0 && a>0? No (a=-1/3 < 0)
    // logHypot(-1/3, 0): b===0 → log(1/3) = -log(3)
    // atan2(0, -1/3) = π
    // t1 = Complex(-log(3), π)
    // atan result: Complex(-π/2, -log(3)/2)
    // acot(0, 0.5) = Complex(-π/2, -log(3)/2)
    const result = new Complex(0, 0.5).acot();
    expect(result.re).toBeCloseTo(-Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
  });
});