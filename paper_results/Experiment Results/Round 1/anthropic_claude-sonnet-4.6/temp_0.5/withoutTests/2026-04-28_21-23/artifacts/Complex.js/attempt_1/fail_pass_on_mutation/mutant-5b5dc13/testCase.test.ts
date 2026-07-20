import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a purely imaginary number with a=0, b!=0", () => {
    // When a=0 and b!=0, d = b*b != 0, so we go through the (d !== 0) branch
    // acsch(i) = asinh(1/i) = asinh(-i) = -i*pi/2
    // The result should have re=0, im=-pi/2
    const c = new Complex(0, 1);
    const result = c.acsch();
    
    // acsch(i) = log(i + sqrt(1 - 1)) = log(i) = i*pi/2... 
    // Actually acsch(i) = log((1 + sqrt(1+i^2))/i) = log((1+0)/i) = log(1/i) = log(-i) = -i*pi/2
    // So re=0, im=-pi/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    
    // Also test with non-zero real part to ensure the mutation doesn't affect normal cases
    // Test acsch(1+i) - this exercises the normal d!=0 branch
    const c2 = new Complex(1, 1);
    const result2 = c2.acsch();
    
    // Verify the result is finite and reasonable
    expect(isFinite(result2.re)).toBe(true);
    expect(isFinite(result2.im)).toBe(true);
    
    // The mutation affects when d===0 and a!==0 vs a===0
    // To trigger: we need d=0, b!=0 - impossible with real arithmetic
    // But we can test the sign/value of the real part for a complex number with a!=0
    // acsch(2+i): a/d should give positive real contribution when a>0
    const c3 = new Complex(2, 1);
    const result3 = c3.acsch();
    expect(result3.re).toBeGreaterThan(0);
  });
});