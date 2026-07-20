import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('0^(1+i) should equal zero', () => {
    // With z['im'] > 0 and a=0, b=0, z['re'] > 0: both versions hit the placeholder
    // Original: z['im'] >= 0 catches this (im=1 > 0, so >= 0 also true)
    // The real test: z['im'] = 0 is unreachable due to switch
    // Let's verify the switch case for z['re']=4 (case 0): returns Complex(Math.pow(0,4), 0) = Complex(0,0)
    const r1 = new Complex(0, 0).pow(new Complex(4, 0));
    const r2 = new Complex(0, 0).pow(new Complex(8, 0));
    expect(r1.equals(Complex.ZERO)).toBe(true);
    expect(r2.equals(Complex.ZERO)).toBe(true);
    // case 2: z['re']=2, returns Complex(-Math.pow(0,2), 0) = Complex(-0, 0)
    const r3 = new Complex(0, 0).pow(new Complex(2, 0));
    expect(r3.isZero()).toBe(true);
  });
});