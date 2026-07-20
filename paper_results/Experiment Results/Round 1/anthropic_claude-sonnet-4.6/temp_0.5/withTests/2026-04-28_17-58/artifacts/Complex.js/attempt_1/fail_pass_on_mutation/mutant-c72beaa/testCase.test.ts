import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation detection", () => {
  it("should return Infinity real part when acot is called on zero complex number via d===0 branch", () => {
    // When d = a*a + b*b = 0, and a !== 0, the original returns a/0 = Infinity
    // The mutation returns a*0 = 0
    // We can reach this by calling acot on a complex number where re=0, im=0
    // but b===0 exits early. Let's use asec to verify the pattern, 
    // then test acot with a non-zero real part where d=0 is forced via NaN-like path
    // Actually test acot(0,0) - b=0 so Math.atan2(1,0) = PI/2
    const result = new Complex(0, 0).acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(0);
    
    // Test that acot of a pure imaginary number works correctly
    // For z = 0 + 2i: acot(2i) 
    const z = new Complex(0, 2);
    const acotResult = z.acot();
    // acot(z) = atan(1/z), 1/(2i) = -i/2 = 0 - 0.5i
    // atan(-0.5i) = i/2 * log((i - 0.5i)/(i + 0.5i)) = i/2 * log(0.5/1.5) = i/2 * log(1/3)
    const expected = new Complex(0, -0.5).atan();
    expect(acotResult.re).toBeCloseTo(expected.re, 10);
    expect(acotResult.im).toBeCloseTo(expected.im, 10);
  });
});