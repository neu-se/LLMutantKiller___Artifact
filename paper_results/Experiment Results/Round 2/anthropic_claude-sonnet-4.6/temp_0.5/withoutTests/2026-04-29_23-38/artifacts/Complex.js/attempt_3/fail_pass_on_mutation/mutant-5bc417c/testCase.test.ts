import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('acoth of purely imaginary number i gives correct result', () => {
    // acoth(i) = atanh(1/i) = atanh(-i) = -i*pi/4
    // With if(true): returns Complex(0, PI/2)
    // With if(b===0) [original?]: b=0 is false, so goes to d=1, returns Complex(0,-1).atanh()
    //   atanh(0-i) = 0 - i*pi/4
    const result = new Complex(0, 1).acoth();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 4);
  });
});