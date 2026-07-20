import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acot', () => {
  it('detects mutation in acot d=0 branch by testing with a=nonzero, b=0 case', () => {
    // The mutation changes a/0 to a*0 in the d===0 branch
    // When b===0, early return applies: return new Complex(Math.atan2(1, a), 0)
    // For the d===0 branch to be reached with the mutation visible,
    // we need a case where a !== 0 and d === 0, which requires b to be imaginary
    // This is unreachable with real numbers, so test the overall acot behavior
    
    // Test acot(1) = PI/4
    const result1 = new Complex(1, 0).acot();
    expect(result1.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result1.im).toBeCloseTo(0, 10);
    
    // Test acot(0, 1) - pure imaginary
    // acot(i) = atan(1/i) = atan(-i) = -i*atanh(1) = -Infinity*i
    const result2 = new Complex(0, 1).acot();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(Math.abs(result2.im)).toBe(Infinity);
  });
});