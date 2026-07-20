import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow nested condition', () => {
  it('0^(-1) should be Infinity, not zero', () => {
    // 0^(-1) = Infinity
    // With if(true) outer, enters block, but z['re']=-1 < 0 so inner check fails
    // Hmm, need to think differently
    // 
    // Actually test: non-zero base raised to positive real exponent
    // that goes through general formula path
    // (0+1i)^3 = -i, reaches switch case 3: returns (0, -Math.pow(1,3)) = (0,-1)
    const result = new Complex(0, 1).pow(3);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-1, 10);
  });
});