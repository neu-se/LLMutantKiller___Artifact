import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc function', () => {
  it('should correctly compute acsc for a purely imaginary number where d is 0 edge case', () => {
    // Test acsc with a value that exercises the code path
    // For a purely imaginary number like i, acsc(i) = -i * log(i/i + sqrt(1 - 1/i^2))
    // Let's test with a real number to verify normal behavior first
    // Then test with imaginary to detect the mutation
    
    // acsc(2) = asin(1/2) = PI/6
    const result = new Complex(0, 1).acsc();
    const expected = new Complex(0, 1).inverse().asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});